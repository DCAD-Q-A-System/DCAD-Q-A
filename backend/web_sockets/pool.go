package web_sockets

import (
	"fmt"

	"dcad_q_a_system.com/utils"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan utils.BroadcastMessage
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan utils.BroadcastMessage),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for c := range pool.Clients {
				fmt.Println(client)
				if c.MeetingId == client.MeetingId {
					client.Conn.WriteJSON(utils.SocketMesageSend{NewOnlineMembers: []utils.SocketMember{
						{
							UserId:client.ID,
							Username:client.Username,
						},
					}})
				}
			}
			// break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for c, _ := range pool.Clients {
				if c.MeetingId == client.MeetingId {
					client.Conn.WriteJSON(utils.SocketMesageSend{MembersWhoLeft: []utils.SocketMember{
						{
							UserId: client.ID,
							Username: client.Username,
						},
					}})
				}
			}
			// break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client := range pool.Clients {
				if client.MeetingId == message.Message.MeetingId{
					if err := client.Conn.WriteJSON(message); err != nil {
						fmt.Println(err)
						return
					}
				}
			}
			// break
		}
	}
}
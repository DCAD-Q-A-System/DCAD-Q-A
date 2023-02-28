package web_sockets

import (
	"fmt"
	"net/http"

	"dcad_q_a_system.com/meeting"
	"dcad_q_a_system.com/utils"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan utils.BroadcastMessage
	CommandBroadcast chan utils.CommandMessage
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan utils.BroadcastMessage),
		CommandBroadcast: make(chan utils.CommandMessage),
	}
}

func (pool *Pool) Start(conn *utils.MongoConnection) {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for c := range pool.Clients {
				
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

			errorNo := meeting.LeaveMeetingDb(conn,&utils.JoinMeeting{
				MeetingId:client.MeetingId,
				UserId: client.ID,
			})
			if errorNo != http.StatusOK {
				fmt.Println("couldn't disconnect from server whiel unregistering")
			}
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))

			for c := range pool.Clients {
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
			
		case command := <- pool.CommandBroadcast:
			fmt.Println("sending command to one of clients",command.UserId)
			for client := range pool.Clients {
				fmt.Println(client.ID)
				if client.ID == command.UserId {
					if err := client.Conn.WriteJSON(command); err != nil {
						fmt.Println(err)
						return
					}
				}
			}
			// break
		}
	}
}
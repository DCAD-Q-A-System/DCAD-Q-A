package web_sockets

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"dcad_q_a_system.com/middleware"
	"dcad_q_a_system.com/utils"
	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	MeetingId string
	Username string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}



func (c *Client) Read(conn *utils.MongoConnection) {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		
		// if messageType is referencing type text
		if messageType == 0 {
			continue
		}
		var socket_message utils.SocketMessage
		err = json.Unmarshal(p,&socket_message)
		if err != nil {
			fmt.Printf("Json marshal error %v\n",err)
			c.Conn.WriteJSON(map[string]string{
				"error":"wrong json format",
			})
			continue
		}
		fmt.Println("Socket message",socket_message.Username)

		var valid utils.SOCKET_ERROR_TYPE = middleware.CheckSocketMessage(&socket_message)
		if valid != utils.NONE {
			fmt.Println("Message format wrong")
			msg := map[string]string{}
			switch valid {
			case utils.INVALID_REQ_TYPE:
				msg["error"] = "INVALID_REQ_TYPE"
			case utils.MEETING_ID_EMPTY:
				msg["error"] = "MEETING_ID_EMPTY"
			}
			c.Conn.WriteJSON(msg)
			continue 
		}

		res := SocketRouter(conn,&socket_message)
		if res.MeetingId == "" {
			fmt.Println("Message type wrong")
			c.Conn.WriteJSON(map[string]string{
				"error":"something went wrong with message",



			})
			continue 
		}


		if c.ID == "" {
			c.ID = socket_message.UserId
		}
		if c.MeetingId == ""{
			c.MeetingId = socket_message.MeetingId
		}
		if c.Username == "" {
			c.Username = socket_message.Username[:]
		}

		fmt.Println()
		c.Pool.Broadcast <- utils.BroadcastMessage{
			Message: res,
			UserId: c.ID,
		}

		
		fmt.Printf("Message Received: %+v\n", res)

	}
}
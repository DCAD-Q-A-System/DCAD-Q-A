package web_sockets

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"dcad_q_a_system.com/auth"
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



func (c *Client) Read(conn *utils.MongoConnection,jwt string) {
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
		
		if c.ID == "" {
			c.ID = socket_message.UserId
		}
		if c.MeetingId == ""{
			fmt.Println("Meeting id",socket_message.MeetingId)
			c.MeetingId = socket_message.MeetingId
		}
		if c.Username == "" {
			c.Username = socket_message.Username[:]
		}
		fmt.Println("After assigned")
		fmt.Println(c.ID)
		fmt.Println(c.MeetingId)
		fmt.Println(c.Username)


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

		
		if jwt == "" || !auth.VerifyJWTSocket(jwt){
			if socket_message.ReqType == "PING"{
				c.Pool.Broadcast <- utils.BroadcastMessage{
					Message: utils.SocketMesageSend{},
					UserId: c.ID,
				}
			}else{
				c.Conn.WriteJSON(map[string]string{
					"error":"unauthorised",
				})
			}
			continue
		}
		
		if socket_message.ReqType == "MAKE_USER_LEAVE" {
			if utils.SockAuth(conn,socket_message.UserId) {
				c.Pool.CommandBroadcast <- utils.CommandMessage {
					Command:"MAKE_USER_LEAVE",
					UserId: socket_message.UserIdToSendCommand,
				}
			}
			continue
		}

		res := SocketRouter(conn,&socket_message)
		if res.MeetingId == "" {
			fmt.Println("Message type wrong",socket_message.ReqType)
			c.Conn.WriteJSON(map[string]string{
				"error":"something went wrong with message",
			})
			continue 
		}

		
		c.Pool.Broadcast <- utils.BroadcastMessage{
			Message: res,
			UserId: c.ID,
		}

		
		fmt.Printf("Message Received: %+v\n", res)
	}
}
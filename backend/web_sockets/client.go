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
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Id string    `json:"id"`
	Content string `json:"content"`
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
			fmt.Printf("Json marshal error %v",err)
			c.Conn.WriteJSON(map[string]string{
				"error":"wrong format",
			})
			continue 
		}
		if !middleware.CheckSocketMessage(&socket_message) {
			fmt.Println("Message format wrong")
			c.Conn.WriteJSON(map[string]string{
				"error":"wrong format",
			})
			continue 
		}

		res := SocketRouter(conn,&socket_message)
		if len(res) == 0 || res["id"] == "" {
			fmt.Println("Message type wrong")
			c.Conn.WriteJSON(map[string]string{
				"error":"something went wrong with message",
			})
			continue 
		}

		message := Message{Id:res["id"], Content:socket_message.Content}
		c.Pool.Broadcast <- message

		fmt.Printf("Message Received: %+v\n", message)

	}
}
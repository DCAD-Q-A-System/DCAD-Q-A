package web_sockets

import (
	"fmt"
	"log"
	"sync"

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
	Type int    `json:"type"`
	Body string `json:"body"`
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
		
		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message

		fmt.Printf("Message Received: %+v\n", message)

	}
}
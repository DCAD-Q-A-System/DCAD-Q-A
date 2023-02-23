package web_sockets

import (
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"

	"github.com/gorilla/websocket"
)


var wsupgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}
func SetUpSocketServer(conn *utils.MongoConnection,pool *Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	sock_conn, err := Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &Client{
		Conn: sock_conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read(conn)
}
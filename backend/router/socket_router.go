package router

import (
	"fmt"

	"dcad_q_a_system.com/questions"
	"dcad_q_a_system.com/utils"
	socketio "github.com/googollee/go-socket.io"
)

func SetUpSocketServer(conn *utils.MongoConnection) *socketio.Server {
    socket_server := socketio.NewServer(nil)

	socket_server.OnConnect("/",func (s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected",s.ID())
		return nil
	})
	socket_server.OnDisconnect("/",func(c socketio.Conn, s string) {
		c.SetContext("")
		fmt.Println("Left!")
	})
	socket_server.OnError("/",func(c socketio.Conn, err error) {
		fmt.Printf("%v",err)

	})

	socket_server.OnEvent("/","msg",func(s socketio.Conn, msg string) string {
		s.SetContext(msg)
		return "Nothing"
	})
	socket_server.OnEvent("question", "insert", questions.InsertQuestion(conn))


	
	
	return socket_server
}
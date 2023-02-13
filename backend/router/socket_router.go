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

	socket_server.OnEvent("/question", "insert", questions.InsertQuestion(conn))


	go func() {
		if err := socket_server.Serve(); err != nil {
			fmt.Printf("socketio listen error: %s\n", err)
		}
	}()
	defer socket_server.Close()
	
	return socket_server
}
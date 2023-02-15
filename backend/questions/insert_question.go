package questions

import (
	"dcad_q_a_system.com/utils"
	socketio "github.com/googollee/go-socket.io"
)

func InsertQuestion(conn *utils.MongoConnection) func(socketio.Conn,string) string {
	return func (s socketio.Conn, msg string) string {
		s.SetContext(msg)
		
		return "recvd"
	}

}
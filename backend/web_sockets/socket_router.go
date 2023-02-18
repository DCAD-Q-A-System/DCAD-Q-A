package web_sockets

import (
	"dcad_q_a_system.com/chat"
	"dcad_q_a_system.com/questions"
	"dcad_q_a_system.com/utils"
)

func SocketRouter(conn *utils.MongoConnection, socket_message *utils.SocketMessage) map[string]string {
	switch socket_message.ReqType {
	case "INSERT_CHAT":
		return chat.InsertChat(conn,socket_message.Content,socket_message.MeetingId)
	
	case "INSERT_QUESTION":
		return questions.InsertQuestion(conn,socket_message.Content,socket_message.MeetingId)
	default:
		return nil
	}
}
package web_sockets

import (
	"dcad_q_a_system.com/chat"
	"dcad_q_a_system.com/questions"
	"dcad_q_a_system.com/replies"
	"dcad_q_a_system.com/utils"
)

func SocketRouter(conn *utils.MongoConnection, socket_message *utils.SocketMessage) map[string]string {
	switch socket_message.ReqType {
	case "INSERT_CHAT":
		return chat.InsertChat(
			conn,
			socket_message.Content,
			socket_message.MeetingId,
			socket_message.UserId,
		)
	
	case "INSERT_QUESTION":
		return questions.InsertQuestion(
				conn,
				socket_message.Content,
				socket_message.MeetingId,
				socket_message.UserId,
			)
	case "INSERT_REPLY":
		return replies.InsertReply(
				conn,
				socket_message.Content,
				socket_message.ChatId,
				socket_message.UserId,
			)
	default:
		return nil
	}
}
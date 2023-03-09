package web_sockets

import (
	"dcad_q_a_system.com/chat"
	"dcad_q_a_system.com/questions"
	"dcad_q_a_system.com/replies"
	"dcad_q_a_system.com/utils"
)

func SocketRouter(conn *utils.MongoConnection, socket_message *utils.SocketMessage) utils.SocketMesageSend {
	switch socket_message.ReqType {
		case "INSERT_CHAT":
			return chat.InsertChat(
				conn,
				socket_message.Content,
				socket_message.MeetingId,
				socket_message.UserId,
				socket_message.Username,
			)
		
		case "INSERT_QUESTION":
			return questions.InsertQuestion(
					conn,
					socket_message.Content,
					socket_message.MeetingId,
					socket_message.UserId,
					socket_message.Username,
				)
		case "INSERT_REPLY":
			return replies.InsertReply(
					conn,
					socket_message.Content,
					socket_message.ChatId,
					socket_message.UserId,
					socket_message.Username,
					socket_message.MeetingId,
				)
		case "PING":
			return utils.SocketMesageSend{
				MeetingId: socket_message.MeetingId,
			}
		case "DELETE_QUESTION":
			return questions.DeleteQuestion(conn,socket_message.QuestionId,socket_message.MeetingId)
		case "DELETE_CHAT":
			return chat.DeleteChat(conn,socket_message.ChatId,socket_message.MeetingId)
		case "DELETE_REPLY":
			return replies.DeleteReply(conn,socket_message.ReplyId,socket_message.ChatId,socket_message.MeetingId)
		case "SWITCH_QUESTION_ANSWERED":
			return questions.UpdateQuestionAnswered(conn,socket_message.QuestionId,socket_message.MeetingId,socket_message.QuestionAnswered)
		case "CHANGE_VOTE_COUNT":
			return questions.ChangeVoteCountQuestion(
				conn,socket_message.MeetingId,
				socket_message.QuestionId,
				socket_message.VoteCount,
			)
		case "CHANGE_CURRENT_QUESTION":
			return questions.ChangeCurrentQuestion(conn,socket_message.MeetingId,socket_message.CurrentQuestionId)
		default:
			return utils.SocketMesageSend{}
	}
}


func SocketRouterPriveleged(conn *utils.MongoConnection, socket_message *utils.SocketMessage) utils.SocketMesageSend{
	switch socket_message.ReqType{
		case "DELETE_QUESTION":
			return questions.DeleteQuestion(conn,socket_message.QuestionId,socket_message.MeetingId)
		case "DELETE_CHAT":
			return chat.DeleteChat(conn,socket_message.ChatId,socket_message.MeetingId)
		case "DELETE_REPLY":
			return replies.DeleteReply(conn,socket_message.ReplyId,socket_message.ChatId,socket_message.MeetingId)
		case "SWITCH_QUESTION_ANSWERED":
			return questions.UpdateQuestionAnswered(conn,socket_message.QuestionId,socket_message.MeetingId,socket_message.QuestionAnswered)
		case "CHANGE_CURRENT_QUESTION":
			return questions.ChangeCurrentQuestion(conn,socket_message.MeetingId,socket_message.CurrentQuestionId)
		default:
			return utils.SocketMesageSend{}
	}
}

package middleware

import (
	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/utils"
)

func CheckSocketMessage(socket_message *utils.SocketMessage) bool {
	if !utils.ALLOWED_REQ_TYPES[socket_message.ReqType] {
		return false
	}

	if !auth.VerifyJWTSocket(socket_message.Token){
		return false
	}

	if socket_message.MeetingId == "" {
		return false
	}

	return true

}
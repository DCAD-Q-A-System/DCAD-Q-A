package middleware

import (
	"dcad_q_a_system.com/utils"
)

func CheckSocketMessage(socket_message *utils.SocketMessage) utils.SOCKET_ERROR_TYPE {
	if !utils.ALLOWED_REQ_TYPES[socket_message.ReqType] {
		return utils.INVALID_REQ_TYPE
	}
	if socket_message.MeetingId == "" {
		return utils.MEETING_ID_EMPTY
	}

	return utils.NONE

}
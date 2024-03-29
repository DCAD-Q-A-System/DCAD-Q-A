package utils

import (
	"os"
)

const MONGODB_URI = "MONGODB_URI"
const DB_NAME = "DCAD-Q-A"

//Collection names
const (
	CHAT      string = "chat"
	MEETINGS  string = "meetings"
	QUESTIONS string = "questions"
	REPLIES   string = "replies"
	USERS     string = "users"
)

const IS_UP_VOTE = "isUpVote"

var JWT_KEY = []byte(os.Getenv("JWT_KEY"))

const TIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ"

var ALLOWED_REQ_TYPES = map[string]bool{
	"INSERT_CHAT":              true,
	"INSERT_QUESTION":          true,
	"INSERT_REPLY":             true,
	"MAKE_USER_LEAVE":          true,
	"PING":                     true,
	"SWITCH_QUESTION_ANSWERED": true,
	"DELETE_QUESTION":          true,
	"DELETE_CHAT":              true,
	"DELETE_REPLY":             true,
	"CHANGE_VOTE_COUNT":        true,
	"CHANGE_CURRENT_QUESTION":  true,
}

var PRIVELEGED_REQ_TYPES = map[string]bool{
	"SWITCH_QUESTION_ANSWERED": true,
	"DELETE_QUESTION":          true,
	"DELETE_CHAT":              true,
	"DELETE_REPLY":             true,
	"CHANGE_CURRENT_QUESTION":  true,
}

var USER_CREATION_ALLOWED_TYPES = map[string]bool{
	"PANELLIST": true,
	"STUDENT":   true,
}

type SOCKET_ERROR_TYPE int

const (
	INVALID_REQ_TYPE SOCKET_ERROR_TYPE = iota
	NONE
	MEETING_ID_EMPTY
)
package utils

const MONGODB_URI = "mongodb+srv://group20:group20@cluster0.oehptrf.mongodb.net/?retryWrites=true&w=majority"

const DB_NAME = "DCAD-Q-A"

//Collection names
const (
	CHAT      string = "chat"
	MEETINGS  string = "meetings"
	QUESTIONS string = "questions"
	REPLIES   string = "replies"
	USERS     string = "users"
)

var JWT_KEY = []byte("SecretYouShouldHide")

const TIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ"

var ALLOWED_REQ_TYPES = map[string]bool{
	"INSERT_CHAT":     true,
	"INSERT_QUESTION": true,
	"INSERT_REPLY":    true,
	// for later
	// "KICK_USER":       true,
	// "DELETE_QUESTION": true,
	// "DELETE_CHAT":     true,
}

type SOCKET_ERROR_TYPE int

const (
	INVALID_REQ_TYPE SOCKET_ERROR_TYPE = iota
	NONE
	INVALID_JWT
	MEETING_ID_EMPTY
)
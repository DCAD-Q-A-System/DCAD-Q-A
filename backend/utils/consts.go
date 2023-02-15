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
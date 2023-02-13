package utils

const MONGODB_URI = "mongodb+srv://group20:group20@cluster0.oehptrf.mongodb.net/?retryWrites=true&w=majority"

const DB_NAME = "DCAD-Q-A"

var COLLECTIONS = []string{
	"questions",
	"chat",
	"login",
	"meetings",
}

var JWT_KEY = []byte("SecretYouShouldHide")
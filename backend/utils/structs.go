package utils

import (
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Type string `json:"type"`
}

type MongoConnection struct {
	Client *mongo.Client
}

type GetMeetingData struct {
	MeetingId string `json:"meetingId"`
}

type Question struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
	ParentMeetingId primitive.ObjectID `bson:"parentMeetingId"`
	UserName string `bson:"username"`
	UserId primitive.ObjectID `bson:"userId"`
	Answered bool `bson:"answered"`
	VoteCount int32 `bson:"voteCount"`
}

type Chat struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
	ParentMeetingId primitive.ObjectID `bson:"parentMeetingId"`
	Replies []primitive.ObjectID `bson:"replies"`
	UserName string `bson:"username"`
	UserId primitive.ObjectID `bson:"userId"`
}

type Reply struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	ParentChatId primitive.ObjectID `bson:"parentChatId"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
	UserName string `bson:"username"`
	UserId primitive.ObjectID `bson:"userId"`
	ParentMeetingId primitive.ObjectID `bson:"parentMeetingId"`
}

type User struct {
	Id primitive.ObjectID `bson:"_id"`
	Username string `bson:"username"`
	Password string `bson:"password"`
	Salt string `bson:"salt"`
	Type string `bson:"type"`
}

type UserJson struct {
	UserId   string            `json:"userId"`
	Username string            `json:"username"`
	Password string             `json:"password"`
	Type     string             `json:"type"`
}

type Meeting struct {
	Id primitive.ObjectID `bson:"_id"`
	Name string `bson:"name"`
	StartTime primitive.DateTime `bson:"startTime"`
	EndTime primitive.DateTime `bson:"endTime"`
	Chats []primitive.ObjectID `bson:"chats"`
	Questions []primitive.ObjectID `bson:"questions"`
	Members []primitive.ObjectID `bson:"members"`
	OnlineMembers []primitive.ObjectID `bson:"onlineMembers"`
	IframeLink string `bson:"iframeLink"`
	CurrentQuestionId primitive.ObjectID `bson:"currentQuestionId"`
}

type JsonMeeting struct {
	Id string `json:"id"`
	Name string `json:"name"`
	StartTime string `json:"startTime"`
	EndTime string `json:"endTime"`
	Chats []string `json:"chats"`
	Questions []string `json:"questions"`
	Members []string `json:"members"`
	OnlineMembers []string `json:"onlineMembers"`
	IframeLink string `json:"iframeLink"`
}

type EssentialMeetingDetails struct {
	Id string `json:"id"`
	Name string `json:"name"`
	StartTime string `json:"startTime"`
	EndTime string `json:"endTime"`
	Members []map[string]string `json:"members"`
	IframeLink string `json:"iframeLink"`
} 

type JoinMeeting struct {
	MeetingId string `json:"meetingId"`
	UserId string `json:"userId"`
}
type GetAllMeetings struct {
	UserId string `json:"userId"`
}


type SocketMessage struct {
	ReqType string `json:"reqType"`
	Content string `json:"content"`
	MeetingId string `json:"meetingId"`
	ChatId string `json:"chatId"`
	ReplyId string `json:"replyId"`
	QuestionId string `json:"questionId"`
	QuestionAnswered bool `json:"questionAnswered"`
	CurrentQuestionId  string `json:"currentQuestionId"`
	UserId string `json:"userId"`
	Username string `json:"username"`
	VoteCount int32 `json:"voteCount"`
	UserIdToSendCommand []string `json:"userIdToSendCommand"`
}


type JwtClaims struct {
	Username       string `json:"username"`
	UserId 		   string `json:"userId"`
	Type 		   string `json:"type"` 
	jwt.StandardClaims
}
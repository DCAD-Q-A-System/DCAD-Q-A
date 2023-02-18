package utils

import (
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
	MeetingId string `json:"meeting_id"`
}

type Question struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
	ParentMeetingId primitive.ObjectID `bson:"parentMeetingId"`
}

type Chat struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
	ParentMeetingId primitive.ObjectID `bson:"parentMeetingId"`
	Replies []primitive.ObjectID `bson:"replies"`
}

type Reply struct {
	Id primitive.ObjectID `bson:"_id"`
	Content string `bson:"content"`
	ParentChatId primitive.ObjectID `bson:"parentChatId"`
	TimeCreated primitive.DateTime `bson:"timeCreated"`
}

type User struct {
	Id primitive.ObjectID `bson:"_id"`
	Username string `bson:"username"`
	Password string `bson:"password"`
	Salt string `bson:"salt"`
	Type string `bson:"type"`
}
type Meeting struct {
	Id primitive.ObjectID `bson:"_id"`
	Name string `bson:"name"`
	StartTime primitive.DateTime `bson:"startTime"`
	EndTime primitive.DateTime `bson:"endTime"`
	Chats []primitive.ObjectID `bson:"chats"`
	Questions []primitive.ObjectID `bson:"questions"`
	Members []primitive.ObjectID `bson:"members"`
	IframeLink string `bson:"iframeLink"`
}

type JsonMeeting struct {
	Name string `json:"name"`
	StartTime string `json:"startTime"`
	EndTime string `json:"endTime"`
	Chats []string `json:"chats"`
	Questions []string `json:"questions"`
	Members []string `json:"members"`
	IframeLink string `json:"iframeLink"`
}


type SocketMessage struct {
	ReqType string `json:"reqType"`
	Content string `json:"content"`
	Token string `json:"token"`
	MeetingId string `json:"meetingId"` 
}

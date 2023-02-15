package utils

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
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
type Meeting struct {
	Id primitive.ObjectID `bson:"_id"`
	StartTime primitive.DateTime `bson:"startTime"`
	EndTime primitive.DateTime `bson:"endTime"`
	Chats []primitive.ObjectID `bson:"chats"`
	Questions []primitive.ObjectID `bson:"questions"`
	Members []primitive.ObjectID `bson:"members"`
}

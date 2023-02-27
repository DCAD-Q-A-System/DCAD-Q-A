package utils

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SocketReply struct {
	MessageStructure
	ParentChatId string `json:"parentChatId"`
}

type MessageStructure struct {
	Id          string `json:"id"`
	Content     string `json:"content"`
	TimeCreated string `json:"timeCreated"`
	UserId      string `json:"userId"`
	Username    string `json:"username"`
}

type SocketChat struct {
	MessageStructure
	Replies []SocketReply `json:"replies"`
}
type SocketMesageSend struct {
	MeetingId        string             `json:"meetingId"`
	Chat             []SocketChat       `json:"chat"`
	Questions        []MessageStructure `json:"questions"`
	NewOnlineMembers []SocketMember     `json:"newOnlineMembers"`
	MembersWhoLeft   []SocketMember     `json:"membersWhoLeft"`
	AllUsers         []SocketMember     `json:"allUsers"`
}

type SocketMember struct {
	Username string `json:"username"`
	UserId   string `json:"userId"`
}

type BSocketMember struct {
	Username string       `bson:"username"`
	Id   primitive.ObjectID `bson:"_id"`
}

type BroadcastMessage struct {
	Message SocketMesageSend `json:"message"`
	UserId  string           `json:"userId"`
}

type CommandMessage struct {
	Command string `json:"command"`
	UserId string `json:"userId"`
}

func SockAuth(conn *MongoConnection,userId string) bool {
	ctx := context.Background()

	meeting_collection := conn.Client.Database(DB_NAME).Collection(USERS)
	userIdObj, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return false
	}
	filter := bson.D{
		{"_id",userIdObj},
	}
	res := meeting_collection.FindOne(ctx,filter)
	var user User
	if err := res.Decode(&user); err != nil {
		fmt.Printf("Decode user err %v",err)
		return false
	}

	
	if user.Type == "ADMIN" || user.Type == "PANELLIST" {
		return true
	}
	return false
	

}
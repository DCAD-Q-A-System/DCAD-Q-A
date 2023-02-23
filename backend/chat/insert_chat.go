package chat

import (
	"context"
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InsertChat(conn *utils.MongoConnection, content string, meetingId string,userId string,username string) utils.SocketMesageSend {
	ctx := context.Background()
	response := utils.SocketMesageSend{}
	db := conn.Client.Database(utils.DB_NAME)

	meetingIdObj,err := primitive.ObjectIDFromHex(meetingId)
	if err != nil {
		return response
	}

	userIdObj,err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return response
	}
	meeting_collection := db.Collection(utils.MEETINGS,options.Collection())
	id_instance := meeting_collection.FindOne(ctx,bson.D{
		{"_id",meetingIdObj},
	})
	if id_instance.Err() != nil {
		fmt.Println("id not found or something else")
		return response 
	}
	
	timeNow := primitive.NewDateTimeFromTime(time.Now())
	chat_collection := db.Collection(utils.CHAT, options.Collection())
	
	
	
	res,err := chat_collection.InsertOne(
		ctx,
		map[string]interface{}{
			"content":content,
			"timeCreated":timeNow,
			"parentMeetingId":meetingIdObj,
			"userId":userIdObj,
			"replies":[]primitive.ObjectID{},
			"username":username,
		},
	)

	if err != nil {
		return response
	}
	fmt.Println(res.InsertedID)
	id := res.InsertedID.(primitive.ObjectID)

	filter := bson.D{
		{"_id",meetingIdObj},
	}
	update := bson.D{
		{"$addToSet",bson.D{
			{"chats",id},
		}},
	}
	updateResult,err := meeting_collection.UpdateOne(ctx,filter,update)
	if err != nil {
		fmt.Println("Couldn't update question in meeting")
		return response
	}
	if updateResult.ModifiedCount != 1 {
		fmt.Println("update count not right question in meeting")
		return response
	}
	
	chat := utils.SocketChat{}
	chat.Content = content
	chat.Id = id.Hex()
	chat.Replies = []utils.SocketReply{}
	chat.TimeCreated = timeNow.Time().Format(time.RFC3339)
	chat.UserId = userId

	response.Chat = []utils.SocketChat{
		chat,
	}
	response.MeetingId = meetingId
	return response
}
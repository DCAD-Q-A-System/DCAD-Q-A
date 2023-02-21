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

func InsertChat(conn *utils.MongoConnection, content string, meetingId string,userId string) map[string]string {
	ctx := context.Background()
	response := map[string]string{}
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
		{"$push",bson.D{
			{"questions",id},
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
	
	response["id"] = id.Hex()
	return response
}
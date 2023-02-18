package questions

import (
	"context"
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InsertQuestion(conn *utils.MongoConnection,content string, meetingId string) map[string]string {
		response := map[string]string{}
		ctx := context.Background()
		db := conn.Client.Database(utils.DB_NAME)
		question_collection := db.Collection(utils.QUESTIONS)
		meetingIdObj,err := primitive.ObjectIDFromHex(meetingId)
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
		res,err := question_collection.InsertOne(
			ctx,
			map[string]interface{}{
				"content":content,
				"timeCreated":timeNow,
				"parentMeetingId":meetingIdObj,
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
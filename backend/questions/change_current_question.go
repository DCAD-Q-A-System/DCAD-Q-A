package questions

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ChangeCurrentQuestion(conn *utils.MongoConnection, meetingId string, newQuestionId string) utils.SocketMesageSend {
	response := utils.SocketMesageSend{}

	qId,err := primitive.ObjectIDFromHex(newQuestionId)
	if err != nil {
		fmt.Printf("err qid %v",err)
		return response
	}
	mId,err := primitive.ObjectIDFromHex(meetingId)
	if err != nil {
		fmt.Printf("err mid %v",err)
		return response
	}
	db := conn.Client.Database(utils.DB_NAME)

	meeting_collection := db.Collection(utils.MEETINGS)
	ctx := context.Background()
	
	update := bson.D{
		{"$set",bson.D{
			{"currentQuestionId",qId},
		}},
	}
	filter := bson.D{{"_id",mId}}

	u,err := meeting_collection.UpdateOne(ctx,filter,update)
	if err != nil || u.ModifiedCount == 0 {
		fmt.Printf("err curr q update id %v\n",err)
		return response
	}

	response.MeetingId = meetingId
	response.CurrentQuestionIdChanged = newQuestionId
	return response
}
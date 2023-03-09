package questions

import (
	"context"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ChangeCurrentQuestion(conn *utils.MongoConnection, meetingId string, newQuestionId string) utils.SocketMesageSend {
	response := utils.SocketMesageSend{}

	qId,err := primitive.ObjectIDFromHex(newQuestionId)
	if err != nil {
		return response
	}
	mId,err := primitive.ObjectIDFromHex(meetingId)
	if err != nil {
		return response
	}
	db := conn.Client.Database(utils.DB_NAME)

	questions_collection := db.Collection(utils.QUESTIONS)
	ctx := context.Background()
	
	update := bson.D{
		{"$set",bson.D{
			{"currentQuestionId",qId},
		}},
	}
	
	_,err = questions_collection.UpdateByID(ctx,mId,update)
	if err != nil {
		return response
	}

	response.MeetingId = meetingId
	response.CurrentQuestionIdChanged = newQuestionId
	return response
}
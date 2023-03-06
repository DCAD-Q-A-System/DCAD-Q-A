package questions

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateQuestionAnswered(conn *utils.MongoConnection,questionId string,meetingId string,answered bool) utils.SocketMesageSend {
	database := conn.Client.Database(utils.DB_NAME)
	response := utils.SocketMesageSend{}
	question_collection := database.Collection(utils.QUESTIONS)
	ctx := context.Background()
	qObject, err := primitive.ObjectIDFromHex(questionId)
	if err != nil {
		fmt.Printf("q id from hex gone wrong %v",err)
		return response
	}
	filter:= bson.D{
		{"_id",qObject},
	}
	update := bson.D{
		{"$set",bson.D{
			{"answered",answered},
		}},
	}
	_,err = question_collection.UpdateOne(ctx,filter,update)
	if err != nil {
		fmt.Printf("update gone wrong %v",err)
		return response
	}
	response.MeetingId = meetingId
	response.QuestionsAnswered = []utils.QuestionStruct{
		{
			MessageStructure: utils.MessageStructure{
				Id: questionId,

			},
			Answered: answered,
		},
	}
	
	return response
	
}
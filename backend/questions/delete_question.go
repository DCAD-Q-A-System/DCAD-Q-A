package questions

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DeleteQuestion(
	conn *utils.MongoConnection,
	id string,
	meetingId string,
) utils.SocketMesageSend {
	ctx := context.Background()
	questions_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.QUESTIONS)
	response := utils.SocketMesageSend{}
	questionIdObject, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Printf("bad question id %v\n",err)
		return response
	}
	filter := bson.D{
		{"_id",questionIdObject},
	} 
	_,err = questions_collection.DeleteOne(ctx,filter,options.Delete())
	if err != nil {
		fmt.Printf("question del err %v\n",err)
		return response
	}
	response.QuestionsDeleted = []utils.QuestionStruct{
		{
			MessageStructure: utils.MessageStructure{
				Id:id,
			},
		},
	}
	response.MeetingId = meetingId

	return response
}
package questions

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ChangeVoteCountQuestion(
	conn *utils.MongoConnection,
	meetingId string, 
	questionId string, 
	voteCountChange int32) utils.SocketMesageSend {
	
	response := utils.SocketMesageSend{}
	if voteCountChange != 1 && voteCountChange != -1 {
		fmt.Println("bad vote count increment")
		return response
	}
	
	dB := conn.Client.Database(utils.DB_NAME)

	questions_collection := dB.Collection(utils.QUESTIONS)
	
	ctx := context.Background()

	qObjectId, err := primitive.ObjectIDFromHex(questionId)
	if err != nil {
		return response
	}

	filter := bson.D{
		{"_id",qObjectId},
	}

	res := questions_collection.FindOne(ctx,filter)
	if res.Err() != nil {
		return response
	}
	var q utils.Question
	res.Decode(&q)

	newVoteCount := q.VoteCount + voteCountChange
	update := bson.D{
		{"$set",bson.D{
			{"voteCount",newVoteCount},
		}},
	} 
	updateRes,err := questions_collection.UpdateOne(ctx,filter,update)
	if err != nil || updateRes.ModifiedCount != 1 {
		fmt.Printf("update one err %v\n",err)
		return response
	}

	response.MeetingId = meetingId

	response.QuestionsVoteCountChanged = []utils.QuestionStruct{
		{
			MessageStructure: utils.MessageStructure{Id: questionId},
			VoteCount: newVoteCount,
		},
	}

	
	return response
	
}
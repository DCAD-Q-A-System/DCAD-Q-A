package questions

// import (
// 	"context"

// 	"dcad_q_a_system.com/utils"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

// func UpdateQuestionAnswered(conn *utils.MongoConnection,questionId string,meetingId string) utils.SocketMesageSend {
// 	database := conn.Client.Database(utils.DB_NAME)
// 	response := utils.SocketMesageSend{}
// 	question_collection := database.Collection(utils.QUESTIONS)
// 	ctx := context.Background()
// 	qObject, err := primitive.ObjectIDFromHex(questionId)
// 	if err != nil {
// 		return response
// 	}
// 	filter:= bson.D{
// 		{"_id",qObject},
// 	}
// 	update := bson.D{
// 		{"answered",},
// 	}
// 	question_collection.UpdateOne(ctx,filter,)
// }
package questions

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllQuestions(db *mongo.Database,meeting_question_ids []primitive.ObjectID) ([]utils.Question,error) {
	// fetch all questions from DB
	ctx := context.Background()
	question_collection := db.Collection(utils.QUESTIONS, options.Collection())
	// matchStage := bson.D{
	// 	{
	// 		"$match", bson.D{
	// 			{
	// 				"_id", bson.D{
	// 					{"$in", meeting_question_ids},
	// 				},
	// 			},
	// 		},
	// 	},
	// }
	// groupStage := bson.D{
	// 	{
	// 		"$group", bson.D{
	// 			{
	// 				"_id", bson.D{
	// 					{"$dateToString", bson.D{
	// 						{
	// 							"format", utils.TIME_FORMAT,
	// 						},
	// 						{
	// 							"date", "$timeCreated",
	// 						},
	// 					},
	// 					},
	// 				},
	// 			},
	// 			{
	// 				"count", bson.D{
	// 					{"$sum", 1},
	// 				},
	// 			},
					
	// 		},
	// 	},
	// }

	// descendingSortStage := bson.D{
	// 	{"$sort", bson.D{
	// 		{"count", -1},
	// 	}},
	// }
	// res, err := question_collection.Aggregate(ctx, mongo.Pipeline{groupStage, matchStage, descendingSortStage})
	opts := options.Find().SetSort(bson.D{
		{"timeCreated",1},
	})
	res, err := question_collection.Find(ctx, bson.D{
		{"_id",bson.D{
			{"$in",meeting_question_ids},
		}},
	},opts)
	if err != nil {
		fmt.Printf("aggreg error %v", err)
		return []utils.Question{},err
	}
	// for res.Next(ctx) {
	// 	var p bson.D
	// 	if err = res.Decode(&p); err != nil {
	// 		fmt.Println(err)
	// 		return []utils.Question{},err
	// 	}
	// 	fmt.Printf("%v",p)
	// }
	
	var questions []utils.Question
	err = res.All(ctx, &questions)
	if err != nil {
		fmt.Printf("all decode %v", err)
		return []utils.Question{},err
	}

	return questions,err
}
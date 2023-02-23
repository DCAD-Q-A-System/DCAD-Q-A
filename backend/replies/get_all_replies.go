package replies

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllReplies(db *mongo.Database,meeting_replies_ids []primitive.ObjectID) ([]utils.Reply, error) {
	ctx := context.Background()
	chat_collection := db.Collection(utils.REPLIES, options.Collection())
	opts := options.Find().SetSort(bson.D{
		{"timeCreated",1},
	})
	res, err := chat_collection.Find(ctx, bson.D{
		{"_id",bson.D{
			{"$in",meeting_replies_ids},
		}},
	},opts)
	if err != nil {
		fmt.Printf("%v", err)
		return []utils.Reply{}, err
	}
	var replies []utils.Reply
	err = res.All(ctx, &replies)
	if err != nil {
		fmt.Printf("%v", err)
		return []utils.Reply{}, err
	}

	return replies, err
}
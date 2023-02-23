package chat

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllChat(db *mongo.Database, meeting_chat_ids []primitive.ObjectID) ([]utils.Chat,error) {
	ctx := context.Background()
	chat_collection := db.Collection(utils.CHAT, options.Collection())
	opts := options.Find().SetSort(bson.D{
		{"timeCreated",1},
	})
	res, err := chat_collection.Find(ctx, bson.D{
		{"_id",bson.D{
			{"$in",meeting_chat_ids},
		}},
	},opts)
	if err != nil {
		fmt.Printf("%v", err)
		return []utils.Chat{},err
	}

	var chats []utils.Chat
	err = res.All(ctx, &chats)
	if err != nil {
		fmt.Printf("%v", err)
		return []utils.Chat{},err
	}

	return chats,err
}
package replies

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DeleteReply(conn *utils.MongoConnection,id string,chatId string,meetingId string) utils.SocketMesageSend {
	response := utils.SocketMesageSend{}
	ctx := context.Background()
	database := conn.Client.Database(utils.DB_NAME)
	replies_collection := database.Collection(utils.REPLIES)
	replyIdObj,err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Printf("reply id err %v",err)
		return response
	}
	chatIdObj,err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		fmt.Printf("chat id err %v",err)
		return response
	}
	filter := bson.D{
		{"_id",replyIdObj},
	}
	_,err = replies_collection.DeleteOne(ctx,filter,options.Delete())
	if err != nil {
		fmt.Printf("reply del err %v",err)
		return response
	}

	chat_collection := database.Collection(utils.CHAT)
	filter = bson.D{
		{"_id",chatIdObj},
	}
	update := bson.D{
		{"$pull",bson.D{
			{"replies",replyIdObj},
		}},
	}
	_,err = chat_collection.UpdateOne(ctx,filter,update) 
	if err != nil {
		fmt.Printf("chat del err %v",err)
		return response
	}

	response.RepliesDeleted = []utils.SocketReply{
		{
			MessageStructure: utils.MessageStructure{Id: id},
			ParentChatId: chatId,
		},
	}
	response.MeetingId = meetingId
	return response
}
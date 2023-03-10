package chat

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DeleteChat(conn *utils.MongoConnection,id string, meetingId string) utils.SocketMesageSend {
	response := utils.SocketMesageSend{}
	ctx := context.Background()
	database := conn.Client.Database(utils.DB_NAME)
	chat_collection := database.Collection(utils.CHAT)
	chatIdObj,err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Printf("chat id err %v",err)
		return response
	}
	filter := bson.D{
		{"_id",chatIdObj},
	}
	_,err = chat_collection.DeleteOne(ctx,filter,options.Delete())
	if err != nil {
		fmt.Printf("chat del err %v",err)
		return response
	}

	reply_collection := database.Collection(utils.REPLIES)

	_,err = reply_collection.DeleteMany(ctx,bson.D{{"parentChatId",chatIdObj}})
	if err != nil {
		fmt.Printf("replies children del err %v",err)
		return response
	}
	response.ChatsDeleted = []utils.SocketChat{
		{
			MessageStructure: utils.MessageStructure{Id: id},
		},
	}
	response.MeetingId = meetingId
	return response
}
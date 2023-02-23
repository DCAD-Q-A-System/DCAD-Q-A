package replies

import (
	"context"
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InsertReply(conn *utils.MongoConnection, 
				content string, 
				chatId string, 
				userId string,
				username string) utils.SocketMesageSend {
	
	response := utils.SocketMesageSend{}
	ctx:= context.Background()
	db := conn.Client.Database(utils.DB_NAME)
	reply_collection := db.Collection(utils.REPLIES)
	chatIdObj,err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		fmt.Printf("chatIdObj error %v",err)
		return response
	}
	userIdObj,err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		fmt.Printf("userIdObj error %v",err)
		return response
	}

	meeting_collection := db.Collection(utils.CHAT,options.Collection())
	
	id_instance := meeting_collection.FindOne(ctx,bson.D{
		{"_id",chatIdObj},
	})

	if id_instance.Err() != nil {
		fmt.Println("id not found or something else")
		return response 
	}
	
	timeNow := primitive.NewDateTimeFromTime(time.Now())
	res,err := reply_collection.InsertOne(
		ctx,
		map[string]interface{}{
			"content":content,
			"timeCreated":timeNow,
			"parentChatId":chatIdObj,
			"userId":userIdObj,
			"username":username,
		},
	)
	if err != nil {
		return response
	}
	
	fmt.Println(res.InsertedID)
	id := res.InsertedID.(primitive.ObjectID)

	filter := bson.D{
		{"_id",chatIdObj},
	}
	update := bson.D{
		{"$push",bson.D{
			{"replies",id},
		}},
	}
	fmt.Println(chatIdObj)
	chat_collection := db.Collection(utils.CHAT)
	updateResult,err := chat_collection.UpdateOne(ctx,filter,update)
	if err != nil {
		fmt.Printf("Couldn't update chat %v",err)
		return response
	}
	if updateResult.ModifiedCount != 1 {
		fmt.Println("update count not right")
		return response
	}
	
	chat := utils.SocketChat{}
	chat.Id = chatId
	chat.Replies = []utils.SocketReply{}
	reply := utils.SocketReply{}
	
	reply.Id = id.Hex()
	reply.Content = content
	reply.ParentChatId = chatId
	reply.TimeCreated = timeNow.Time().Format(time.RFC3339)
	reply.UserId = userId
	reply.Username = username
	chat.Replies = append(chat.Replies,reply)
	response.Chat = append(response.Chat,chat)
	
	return response
}
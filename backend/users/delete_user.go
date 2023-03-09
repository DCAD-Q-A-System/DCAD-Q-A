package users

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteUser(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		type UserId struct {
			UserId string `json:"userId"`
		}
		var u UserId

		if err := c.BindJSON(&u); err != nil {
			fmt.Printf("bad req %v\n",err)
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		userObjectId,err := primitive.ObjectIDFromHex(u.UserId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
		}

		ctx := context.Background()


		dB := conn.Client.Database(utils.DB_NAME)

		chat_collection := dB.Collection(utils.CHAT)
		question_collection := dB.Collection(utils.QUESTIONS)
		meeting_collection := dB.Collection(utils.MEETINGS)
		replies_collection := dB.Collection(utils.REPLIES)
		users_collection := dB.Collection(utils.USERS)

		filter := bson.D{
			{"userId",userObjectId},
		}
		_,err = chat_collection.DeleteMany(ctx,filter)
		if err != nil {
			fmt.Printf("del user chat err %v\n",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}
		_,err = question_collection.DeleteMany(ctx,filter)
		if err != nil {
			fmt.Printf("del user questions err %v\n",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}

		_,err = replies_collection.DeleteMany(ctx,filter)
		if err != nil {
			fmt.Printf("del user replies err %v\n",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}
		arr:= []primitive.ObjectID{userObjectId}
		filterUpdate := bson.D{
			{"members",bson.D{
				{"$in",arr},
			}},
			{"onlineMembers",bson.D{
				{"$in",arr},
			}},
		}
		update := bson.D{
			{"$pull",bson.D{
				{"members",userObjectId},
			}},
			{"$pull",bson.D{
				{"onlineMembers",userObjectId},
			}},
		}
		_,err = meeting_collection.UpdateMany(ctx,filterUpdate,update)
		if err != nil {
			fmt.Printf("del user replies err %v\n",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}


		_,err = users_collection.DeleteOne(ctx,bson.D{{"_id",userObjectId}})
		if err != nil {
			fmt.Printf("del error %v\n",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		c.Status(http.StatusOK)
	}
}
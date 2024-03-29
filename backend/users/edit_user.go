package users

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func EditUser(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		var user utils.UserJson
		if err := c.BindJSON(&user);err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		} 
		mongo_db := conn.Client.Database(utils.DB_NAME)
		user_collection := mongo_db.Collection(utils.USERS)
		userIdObj,err := primitive.ObjectIDFromHex(user.UserId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		
		filter := bson.D{
			{"_id",userIdObj},
		}
		resOne := user_collection.FindOne(ctx,filter)
		if resOne.Err() != nil {
			fmt.Printf("cant find one %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		var userOne utils.User
		if err = resOne.Decode(&userOne);err != nil {
			fmt.Printf("cant decode one %v",err)

			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}

		if userOne.Username != user.Username {
			filterMany := bson.D{
				{"_id",userIdObj},
				{"username",user.Username},
			}

			updateUsername := bson.D{
				{"$set",bson.D{
					{"username",user.Username},
				}},
			}

			question_collection := mongo_db.Collection(utils.QUESTIONS)

			_,err = question_collection.UpdateMany(ctx,filterMany,updateUsername,options.Update())
			if err != nil {
				fmt.Printf("Questions update err %s\n",err)
				c.AbortWithStatus(http.StatusBadGateway)
				return 
			}

			chat_collection := mongo_db.Collection(utils.CHAT)
			_,err = chat_collection.UpdateMany(ctx,filterMany,updateUsername,options.Update())
			if err != nil {
				fmt.Printf("Chat update err %s\n",err)
				c.AbortWithStatus(http.StatusBadGateway)
				return 
			}

			reply_collection := mongo_db.Collection(utils.REPLIES)
			_,err = reply_collection.UpdateMany(ctx,filterMany,updateUsername,options.Update())
			if err != nil {
				fmt.Printf("Chat update err %s\n",err)
				c.AbortWithStatus(http.StatusBadGateway)
				return 
			}

		}

		update := bson.D{
			{
				"$set",bson.D{
					{"username",user.Username},
					{"type",user.Type},
				},
			},
		}
		
		res, err := user_collection.UpdateOne(
			ctx,
			filter,
			update,
		)

		if err != nil || res == nil {
			fmt.Printf("Update gone wrong %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		
		
		c.Status(http.StatusOK)
	}

}


func EditUserPassword(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		type SPassword struct {
			Password string `json:"password"`
			UserId string `json:"userId"`
		}
		var user SPassword
		if err := c.BindJSON(&user);err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		} 
		mongo_db := conn.Client.Database(utils.DB_NAME)
		user_collection := mongo_db.Collection(utils.USERS)
		userIdObj,err := primitive.ObjectIDFromHex(user.UserId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		
		filter := bson.D{
			{"_id",userIdObj},
		}
		resOne := user_collection.FindOne(ctx,filter)
		if resOne.Err() != nil {
			fmt.Printf("cant find one %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		var userOne utils.User
		if err = resOne.Decode(&userOne);err != nil {
			fmt.Printf("cant decode one %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}

		hexString := auth.CreateHash(user.Password, userOne.Salt)
	
		if userOne.Password != hexString {
			user.Password = hexString
		}else {
			user.Password = userOne.Password
		}

		update := bson.D{
			{
				"$set",bson.D{
					{"password",user.Password},
				},
			},
		}
		
		res, err := user_collection.UpdateOne(
			ctx,
			filter,
			update,
		)

		if err != nil || res == nil {
			fmt.Printf("Update gone wrong %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		
		
		c.Status(http.StatusOK)
	}
}
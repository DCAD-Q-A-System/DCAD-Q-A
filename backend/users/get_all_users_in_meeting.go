package users

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllUsersInMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		
		meetingId := c.Query("meetingId")
		if meetingId == "" {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		type Users struct {
			UserObjects []utils.BSocketMember `bson:"userObjects"`
		}

		var users []Users

		meetingCollection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
		// filter := bson.D{
		// 	{"_id",meetingId},
		// }
		// single := meetingCollection.FindOne(ctx,filter,options.FindOne())
		// var meeting utils.Meeting
		// if err := single.Decode(&meeting); err != nil {
		// 	fmt.Println("something went wrong decoding meeting")
		// 	return 
		// }
		id, err :=primitive.ObjectIDFromHex(meetingId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		filter := bson.D{
			{"$match",bson.D{
				{"_id",id},
			}},
		}
		

		lookup := bson.D{
			{"$lookup",bson.D{
				{"from",utils.USERS},
				{"localField","onlineMembers"},
				{"foreignField","_id"},
				{"as","userObjects"},
			}},
		}


		project := bson.D{
			{"$project",bson.D{
				{"_id",0},
				{"userObjects._id",1},
				{"userObjects.username",1},
			}},
		}

		cur,err := meetingCollection.Aggregate(
			ctx,
			mongo.Pipeline{filter,lookup,project},
		)
		if err != nil {
			fmt.Printf("Error aggreg %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return 
		}
		if err := cur.All(ctx,&users); err != nil {
			fmt.Printf("Error decoding %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		fmt.Println(users)
		if len(users) != 1 {
			fmt.Printf("not right num res")
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		usersJson := make([]utils.SocketMember,len(users[0].UserObjects))
		for i,val := range users[0].UserObjects {
			usersJson[i] = utils.SocketMember{
				Username: val.Username,
				UserId: val.Id.Hex(),
			}
		} 
		c.JSON(http.StatusOK,usersJson)

		/*
		  [map[userObjects:[map[_id:ObjectID("63ebcc9596fdf39b499b6477") username:username] map[_id:ObjectID("63f52367647d4c1efd740f26") username:admin]]]]
		*/
	
	}
}
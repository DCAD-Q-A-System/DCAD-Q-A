package users

import (
	"context"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func BanUser(conn *utils.MongoConnection) gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx := context.Background()
		type BanUserType struct {
			UserId string `json:"userId"`
			MeetingId string `json:"meetingId"`
		}
		var body BanUserType

		if err := c.BindJSON(&body); err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		meetingCollection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
		meetingIdObj, err := primitive.ObjectIDFromHex(body.MeetingId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}
		userIdObj, err := primitive.ObjectIDFromHex(body.UserId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}
		filter := bson.D{
			{"$and",bson.A{
				bson.D{
					{"_id",meetingIdObj},
				},
				bson.D{
					{
						"members",bson.D{
							{"$in",[]primitive.ObjectID{userIdObj}},
						},
					},
				},
			},},
		}
		update := bson.D{
			{"$pull",bson.D{
				{"onlineMembers",userIdObj},
				{"members",userIdObj},
			}},
		}
		meetingCollection.UpdateOne(ctx,filter,update)
	}
}
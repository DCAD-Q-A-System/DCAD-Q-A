package meeting

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func JoinMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		c := context.Background()
		var join_meeting utils.JoinMeeting

		if err := ctx.BindJSON(&join_meeting); err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}

		m,err := primitive.ObjectIDFromHex(join_meeting.MeetingId)
		if err != nil {
			fmt.Printf("meetingid err %v",err)
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		u,err := primitive.ObjectIDFromHex(join_meeting.UserId)
		if err != nil {
			fmt.Printf("userid err %v",err)
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		meeting_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
		filter := bson.D{
			{
				"$and",bson.A{
					bson.D{
						{
							"_id",m,
						},
					},
					bson.D{
							{
							"members",bson.D{
								{"$in",[]primitive.ObjectID{u}},
							},
						},
					},
			}},
		
		}
		update := bson.D{
			{"$push",bson.D{
				{"onlineMembers",u},
			}},
		}
		res,err := meeting_collection.UpdateOne(
			c,
			filter,
			update,
		)
		if err != nil || res == nil || res.ModifiedCount == 0{
			fmt.Printf("something went wrong with update %v",err)
			ctx.AbortWithStatus(http.StatusBadGateway)
			return
		}

		ctx.Status(http.StatusOK)
	}
}
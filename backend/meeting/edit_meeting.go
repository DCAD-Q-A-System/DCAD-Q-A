package meeting

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func EditMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	
	return func(ctx *gin.Context) {
		c := context.Background()
		var meeting utils.JsonMeeting
		if err := ctx.BindJSON(&meeting);err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		} 
		meeting_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
		meetingIdObj,err := primitive.ObjectIDFromHex(meeting.Id)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}

		
		t,err := time.Parse(time.RFC3339,meeting.StartTime)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		var startTime primitive.DateTime = primitive.NewDateTimeFromTime(t)
		t,err = time.Parse(time.RFC3339,meeting.EndTime)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		var endTime primitive.DateTime = primitive.NewDateTimeFromTime(t)
		var members_ids []primitive.ObjectID = make([]primitive.ObjectID, len(meeting.Members))
		for i,id := range meeting.Members {
			members_ids[i],err = primitive.ObjectIDFromHex(id)
			if err != nil {
				continue
			}
		}
		filter := bson.D{
			{"_id",meetingIdObj},
			{"$or",bson.A{
					bson.D{
						{
							"members",bson.D{
								{"$ne",members_ids},
							},
						}},
						bson.D{
						{
							"startTime",bson.D{
								{"$ne",startTime},
							},
						}},
						bson.D{{
							"endTime",bson.D{
								{"$ne",endTime},
							},
						}},
						bson.D{{
							"name",meeting.Name,
						}},
						bson.D{{
							"iframeLink",meeting.IframeLink,
						}},
					},

				},
		}

		update := bson.D{
			{
				"$set",bson.D{
					{"members",members_ids},
					{"startTime",startTime},
					{"endTime",endTime},
					{"iframeLink",meeting.IframeLink},
					{"name",meeting.Name},
				},
			},
		}
		res, err := meeting_collection.UpdateOne(
			c,
			filter,
			update,
		)

		if err != nil || res == nil || res.ModifiedCount == 0 {
			fmt.Printf("Update gone wrong %v",err)
			ctx.AbortWithStatus(http.StatusBadGateway)
			return
		}
		
		
		ctx.Status(http.StatusOK)

	}
}
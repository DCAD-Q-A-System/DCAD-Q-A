package meeting

import (
	"net/http"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var json_meeting utils.JsonMeeting
		if err := ctx.BindJSON(&json_meeting); err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		var meeting utils.Meeting
		t,err := time.Parse(time.RFC3339,json_meeting.StartTime)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		meeting.StartTime = primitive.NewDateTimeFromTime(t)
		t,err = time.Parse(time.RFC3339,json_meeting.EndTime)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return 
		}
		meeting.EndTime = primitive.NewDateTimeFromTime(t)

		var members_ids []primitive.ObjectID = make([]primitive.ObjectID, len(json_meeting.Members))
		for i,id := range json_meeting.Members {
			members_ids[i],err = primitive.ObjectIDFromHex(id)
			if err != nil {
				continue
			}
		}
		meeting.Chats = []primitive.ObjectID{}
		meeting.Questions = []primitive.ObjectID{}
		meeting.Members = members_ids
		meeting.IframeLink = json_meeting.IframeLink
		meeting.Name = json_meeting.Name

		meetings_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)

		res,err := meetings_collection.InsertOne(ctx,
			map[string]interface{}{
				"name":meeting.Name,
				"startTime":meeting.StartTime,
				"endTime":meeting.EndTime,
				"chats":meeting.Chats,
				"questions":meeting.Questions,
				"members":meeting.Members,
				"iframeLink":meeting.IframeLink,
			},
		)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadGateway)
			return
		}
		id := res.InsertedID.(primitive.ObjectID)

		ctx.JSON(http.StatusOK,
			gin.H{
				"id":id.Hex(),
			},
		)
	}
}
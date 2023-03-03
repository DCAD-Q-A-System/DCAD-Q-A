package meeting

import (
	"context"
	"net/http"
	"time"

	"dcad_q_a_system.com/users"
	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		meetingId := c.Query("meetingId")
		meetings_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)

		meetingIdObj, err := primitive.ObjectIDFromHex(meetingId)

		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		filter := bson.D{
			{"_id",meetingIdObj},
		}

		results := meetings_collection.FindOne(ctx,filter,options.FindOne())
		if results.Err() != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		var meeting utils.Meeting
		if err = results.Decode(&meeting);err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		membersList := make([]map[string]string,len(meeting.Members))
		for i,m := range meeting.Members {
			userJson,errNo := users.GetUserDb(conn,m.Hex())
			if errNo != http.StatusOK {
				continue
			}
			membersList[i] = map[string]string{
				"userId":userJson.UserId,
				"username":userJson.Username,
			}
		}

		meetingJson := utils.EssentialMeetingDetails{
			Id: meeting.Id.Hex(),
			Name:meeting.Name,
			StartTime:meeting.StartTime.Time().Format(time.RFC3339),
			EndTime:meeting.EndTime.Time().Format(time.RFC3339),
			Members: membersList,
			IframeLink: meeting.IframeLink,
		}
		

		c.JSON(http.StatusOK,meetingJson)
	}
}
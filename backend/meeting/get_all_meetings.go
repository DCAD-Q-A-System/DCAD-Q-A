package meeting

import (
	"context"
	"net/http"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllMeetings(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		c := context.Background()
		var details utils.JoinMeeting

		if err := ctx.BindJSON(details); err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		meeting_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
		id,err := primitive.ObjectIDFromHex(details.UserId)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		filter := bson.D{
			{"members",bson.D{
				{"$in",[]primitive.ObjectID{id}},
			}},
		}
		results, err := meeting_collection.Find(c,filter,options.Find().SetProjection(
			bson.D{
				{"_id",1},
			},
		))
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadGateway)
			return
		}

		var bson_meetings []utils.Meeting
		err = results.All(c,&bson_meetings)
		if err != nil {
			ctx.AbortWithStatus(http.StatusBadGateway)
			return
		}
		ids := map[string][]map[string]string{}

		ids["ids"] = []map[string]string{}

		for i,meeting := range bson_meetings {
			ids["ids"][i] = map[string]string{
				"id":meeting.Id.Hex(),
				"name":meeting.Name,
				"startTime":meeting.StartTime.Time().Format(time.RFC3339),
				"endTime":meeting.EndTime.Time().Format(time.RFC3339),
			}
		}


		ctx.JSON(http.StatusOK,ids)

		
	}
}
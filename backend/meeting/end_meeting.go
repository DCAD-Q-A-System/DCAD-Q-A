package meeting

import (
	"context"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func EndMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		var meeting utils.JoinMeeting
		if err := c.BindJSON(&meeting);err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		ctx := context.Background()
		database := conn.Client.Database(utils.DB_NAME)
		meeting_collection := database.Collection(utils.MEETINGS)
		/*TODO*/
		// to use later
		// chat_collection := database.Collection(utils.CHAT)
		// question_collection := database.Collection(utils.QUESTIONS)
		// replies_collection := database.Collection(utils.REPLIES)

		meetingIdObj, err := primitive.ObjectIDFromHex(meeting.MeetingId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
		}
		filter := bson.D{
			{"$match",bson.D{
				{"_id",meetingIdObj},
			}},
		}
		

		
		lookup := bson.D{
			{"$lookup",bson.D{
				{"from",utils.QUESTIONS},
				{"localField",utils.QUESTIONS},
				{"foreignField","_id"},
				{"as","questionObjects"},
			}},
		}

		/* TODO */
		// add extra fields to extract later
		project := bson.D{
			{"$project",bson.D{
				{"_id",0},
				{"questionObjects._id",1},
			}},
		}
		questions_aggr,err := meeting_collection.Aggregate(ctx,mongo.Pipeline{
			filter,lookup,project,
		})
		if err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
		}
		var questionsToDelete []utils.Question
		questions_aggr.All(ctx,&questionsToDelete)

		filter = bson.D{
			{"$match",bson.D{
				{"_id",meetingIdObj},
			}},
		}
		

		lookup = bson.D{
			{"$lookup",bson.D{
				{"from",utils.CHAT},
				{"localField","chats"},
				{"foreignField","_id"},
				{"as","chatObjects"},
			}},
		}


		project = bson.D{
			{"$project",bson.D{
				{"_id",0},
				{"chatObjects._id",1},
			}},
		}
		chat_aggr,err := meeting_collection.Aggregate(ctx,mongo.Pipeline{
			filter,lookup,project,
		})
		if err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
		}
		var chatsToDelete []utils.Chat
		chat_aggr.All(ctx,&chatsToDelete)



	}

}
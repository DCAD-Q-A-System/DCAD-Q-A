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
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

		chat_collection := database.Collection(utils.CHAT)
		question_collection := database.Collection(utils.QUESTIONS)
		replies_collection := database.Collection(utils.REPLIES)

		meetingIdObj, err := primitive.ObjectIDFromHex(meeting.MeetingId)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		questions_aggr,err := FindAllWithId(
			question_collection,
			meetingIdObj,
			&ctx,
		)

		if err != nil {
			fmt.Printf("questions aggr %v\n",err)

			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		var questionsToDelete []utils.Question
		questions_aggr.All(ctx,&questionsToDelete)

		
		_,err = chat_collection.DeleteMany(
			ctx,
			bson.D{{"parentMeetingId",meetingIdObj}},
		)
		if err != nil {
			fmt.Printf("chat aggr %v\n",err)

			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		_,err = replies_collection.DeleteMany(
			ctx,
			bson.D{{"parentMeetingId",meetingIdObj}},
		)

		if err != nil {
			fmt.Printf("replies aggr %v",err)
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		

		var questionIds []primitive.ObjectID
		if len(questionsToDelete) > 0 {
			questionIds = make([]primitive.ObjectID,len(questionsToDelete))
			for i,q := range questionsToDelete {
				questionIds[i] = q.Id
			}
			fmt.Println("DELETING QUESTIONS",questionIds)
			_,err = DeleteManyById(question_collection,questionIds,&ctx)
			if err != nil {
				fmt.Printf("questions delete %v\n",err)
				c.AbortWithStatus(http.StatusBadGateway)
				return 
			}
		}
		

		_,err = meeting_collection.DeleteOne(ctx,bson.D{{"_id",meetingIdObj}},options.Delete())
		if err != nil {
			fmt.Printf("meeting del one %v\n",err)

			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		
		questionsResponse := make([]map[string]string,len(questionsToDelete))
		for i,q := range questionsToDelete {
			questionsResponse[i] = map[string]string{
				"timeCreated":q.TimeCreated.Time().Format(time.RFC3339),
				"username":q.UserName,
				"content":q.Content,
			}
		}
		c.JSON(http.StatusOK,questionsResponse)
	}

}

func FindAllWithId(
		collection *mongo.Collection,
		id primitive.ObjectID,
		ctx *context.Context,
	) (*mongo.Cursor,error) {
	
	
	filter := bson.D{
		{"parentMeetingId",id},
	}
	
	cur,err := collection.Find(*ctx,filter)
	if err != nil {
		return &mongo.Cursor{},err
	}
	return cur,nil
}

func DeleteManyById(
	collection *mongo.Collection,
	ids []primitive.ObjectID,
	ctx *context.Context,
) (*mongo.DeleteResult, error){
	filter := bson.D{
		{"_id",bson.D{
				{"$in",ids},
			},
		},
	}
	res,err := collection.DeleteMany(*ctx,filter)
	if err != nil {
		return nil,err
	}
	return res,nil
}
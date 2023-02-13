package questions

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllQuestions(conn *utils.MongoConnection) gin.HandlerFunc {
	// fetch all questions from DB
	return func(c *gin.Context) {
		var body utils.GetMeetingData

		if err := c.BindJSON(&body); err != nil {
			fmt.Printf("json body err,%v", err)
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		collection := conn.Client.Database(utils.DB_NAME).Collection(utils.COLLECTIONS[3],options.Collection())
		// TODO ADD STRUCTURE TO THE RESULT WHEN DB SORTED 
		result := collection.FindOne(context.TODO(),bson.M{"meeting_id":body.MeetingId})
		
		err := result.Err()
		if err != nil {
			fmt.Printf("%v",err)
			c.AbortWithStatus(500)
			return
		}

	}
}
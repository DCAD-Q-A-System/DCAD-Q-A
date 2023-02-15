package router

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/chat"
	"dcad_q_a_system.com/questions"
	"dcad_q_a_system.com/replies"
	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAll(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body utils.GetMeetingData

		if err := c.BindJSON(&body); err != nil {
			fmt.Printf("json body err,%v", err)
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		ctx := context.Background()
		db := conn.Client.Database(utils.DB_NAME)
		
		// f,_:=conn.Client.ListDatabaseNames(ctx,bson.D{},options.ListDatabases())
		// fmt.Println(f)
		// f,_=db.ListCollectionNames(ctx,bson.D{},options.ListCollections())
		// fmt.Println(f)
		meeting_collection := db.Collection(utils.MEETINGS,options.Collection())
		// d,_:=meeting_collection.CountDocuments(ctx,bson.D{},options.Count())
		// fmt.Println(d)
		// cur,err := meeting_collection.Find(ctx,bson.D{})
		// if err != nil {
		// 	fmt.Printf("%v",err)
		// 	return 
		// }
		// for cur.Next(ctx) {
		// 	var m bson.M
		// 	if err = cur.Decode(&m); err != nil {
		// 		fmt.Printf("err decode %v",err)
		// 		c.AbortWithStatus(http.StatusBadGateway)
		// 		return
		// 	}
		// 	fmt.Println(m)
			
		// }
		
		// defer cur.Close(ctx)
		// TODO ADD STRUCTURE TO THE RESULT WHEN DB SORTED 
		meetingObjectId,err := primitive.ObjectIDFromHex(body.MeetingId)
		if err != nil {
			fmt.Printf("object id conv %v",err)
			c.AbortWithStatus(500)
			return
		}
		
		result := meeting_collection.FindOne(ctx,bson.D{{"_id",meetingObjectId}})
		err = result.Err()
		if err != nil {
			fmt.Printf("Found nothing %v",err)
			c.AbortWithStatus(500)
			return
		}

		var meeting utils.Meeting
		err = result.Decode(&meeting)
		if err != nil {
			fmt.Printf("Decode err %v",err)
			c.AbortWithStatus(500)
			return
		}
		fmt.Printf("%s\n", meeting.Id.Hex())
		if len(meeting.Chats) == 0 || len(meeting.Questions) == 0 {
			fmt.Printf("No chats/questions")
			c.AbortWithStatus(500)
			return
		}
		
		qs, err := questions.GetAllQuestions(db,meeting.Questions)
		if err != nil {
			fmt.Printf("get all questions %v",err)
			c.AbortWithStatus(500)
			return
		}
		chats, err := chat.GetAllChat(db,meeting.Chats)
		if err != nil {
			fmt.Printf("get all chat %v",err)
			c.AbortWithStatus(500)
			return
		}

		bigObject := map[string][]map[string]interface{}{}
		bigObject[utils.QUESTIONS] = make([]map[string]interface{},len(qs))
		bigObject[utils.CHAT] = make([]map[string]interface{},len(chats))
		
		for i := range qs {
			bigObject["questions"][i] = map[string]interface{}{
				"id":qs[i].Id.Hex(),
				"content":qs[i].Content,
				"timeCreated":qs[i].TimeCreated.Time().Unix(),
			}
		}
		
		for i := range chats {
			bigObject[utils.CHAT][i] = map[string]interface{} {
				"id":chats[i].Id.Hex(),
				"content":chats[i].Content,
				"timeCreated":chats[i].TimeCreated.Time().Unix(),
			}
			fmt.Println(chats[i].Replies)
			if len(chats[i].Replies) > 0 {
				r,err := replies.GetAllReplies(db,chats[i].Replies)
				if err != nil {
					fmt.Printf("get all replies %v",err)
					continue
				}
				reps := make([]map[string]interface{},len(r))
				for j := range r {
					reps[j] = map[string]interface{} {
						"id":r[i].Id.Hex(),
						"content":r[i].Content,
						"parentChatId":r[i].ParentChatId.Hex(),
						"timeCreated":r[i].TimeCreated.Time().Unix(),
					}
				}
				bigObject[utils.CHAT][i][utils.REPLIES] = reps

			}
		}

		c.JSON(http.StatusOK,bigObject)
	}
}
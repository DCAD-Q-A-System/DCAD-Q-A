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
		body.MeetingId = c.Query("meetingId")
		// if err := c.BindJSON(&body); err != nil {
		// 	fmt.Printf("json body err,%v", err)
		// 	c.AbortWithStatus(http.StatusBadRequest)
		// 	return 
		// }

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
		onlineMembersIds := make([]string,len(meeting.OnlineMembers))
		for i,memberId := range meeting.OnlineMembers {
			onlineMembersIds[i] = memberId.Hex()
		}
		
		if len(meeting.Chats) == 0 && len(meeting.Questions) == 0 {
			fmt.Printf("No chats/questions")
			// c.JSON(http.StatusOK,meeting)
			// return
			c.JSON(http.StatusOK,gin.H{
				"id":body.MeetingId,
				"messages":map[string][]map[string]interface{}{
					"questions":[]map[string]interface{}{},
					"chat":[]map[string]interface{}{},
				},
				"name":meeting.Name,
				"iframeLink":meeting.IframeLink,
				"startTime":meeting.StartTime.Time().Unix(),
				"endTime":meeting.EndTime.Time().Unix(),
				"onlineMembers":onlineMembersIds,
			})
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
				"userId":qs[i].UserId.Hex(),
				"username":qs[i].UserName,
				"timeCreated":qs[i].TimeCreated.Time().Unix(),
				"answered":qs[i].Answered,
			}
		}
		
		for i := range chats {
			bigObject[utils.CHAT][i] = map[string]interface{} {
				"id":chats[i].Id.Hex(),
				"userId":chats[i].UserId.Hex(),
				"username":chats[i].UserName,
				"content":chats[i].Content,
				"timeCreated":chats[i].TimeCreated.Time().Unix(),
			}
			
			if len(chats[i].Replies) > 0 {
				r,err := replies.GetAllReplies(db,chats[i].Replies)
				if err != nil {
					fmt.Printf("get all replies %v",err)
					continue
				}
				reps := make([]map[string]interface{},len(r))
				for j := range r {
					reps[j] = map[string]interface{} {
						"id":r[j].Id.Hex(),
						"username":r[j].UserName,
						"userId":r[j].UserName,
						"content":r[j].Content,
						"parentChatId":r[j].ParentChatId.Hex(),
						"timeCreated":r[j].TimeCreated.Time().Unix(),
					}
				}
				bigObject[utils.CHAT][i][utils.REPLIES] = reps

			}
		}

		

		c.JSON(http.StatusOK,gin.H{
			"id":body.MeetingId,
			"messages":bigObject,
			"name":meeting.Name,
			"iframeLink":meeting.IframeLink,
			"startTime":meeting.StartTime.Time().Unix(),
			"endTime":meeting.EndTime.Time().Unix(),
			"onlineMembers":onlineMembersIds,
		})
	}
}

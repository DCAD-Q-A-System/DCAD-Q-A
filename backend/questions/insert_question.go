package questions

import (
	"context"
	"encoding/json"
	"fmt"

	"dcad_q_a_system.com/utils"
	socketio "github.com/googollee/go-socket.io"
)

func InsertQuestion(conn *utils.MongoConnection) func(socketio.Conn,string) string {
	return func (s socketio.Conn, msg string) string {
		s.SetContext(msg)
		db := conn.Client.Database(utils.DB_NAME)
		question_collection := db.Collection(utils.QUESTIONS)
		var question utils.Question
		err := json.Unmarshal([]byte(msg),&question)
		if err != nil {
			return "ERROR: Wrong format"
		}
		res,err := question_collection.InsertOne(
			context.Background(),
			map[string]interface{}{
				"content":question.Content,
				"timeCreated":question.TimeCreated,
				"parentMeetingId":question.ParentMeetingId,
			},
		)
		if err != nil {
			return "ERROR: Insertion"
		}
		fmt.Println(res.InsertedID)
		return "recvd"
	}

}
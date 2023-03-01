package meeting

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func LeaveMeetingDb(conn *utils.MongoConnection,join_meeting *utils.JoinMeeting) (int) {
	c := context.Background()
	m, err := primitive.ObjectIDFromHex(join_meeting.MeetingId)
	if err != nil {
		fmt.Printf("meetingid err %s %v",join_meeting.MeetingId, err)
		return http.StatusBadRequest
	}
	u, err := primitive.ObjectIDFromHex(join_meeting.UserId)
	if err != nil {
		fmt.Printf("userid err %v", err)
		return http.StatusBadRequest
	}
	meeting_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
	filter := bson.D{
		{
			"$and", bson.A{
				bson.D{
					{
						"_id", m,
					},
				},
				bson.D{
					{
						"members", bson.D{
							{"$in", []primitive.ObjectID{u}},
						},
					},
				},
			}},
	}
	update := bson.D{
		{"$pull", bson.D{
			{"onlineMembers", u},
		}},
	}
	res, err := meeting_collection.UpdateOne(
		c,
		filter,
		update,
	)
	if err != nil || res == nil {
		fmt.Printf("something went wrong with update %v", err)
		return http.StatusBadGateway
	}

	return http.StatusOK
}
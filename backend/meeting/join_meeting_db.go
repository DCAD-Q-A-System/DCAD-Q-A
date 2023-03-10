package meeting

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func isIdInArray(arr []primitive.ObjectID,id string) bool {
	for _,oid := range arr {
		if oid.Hex() == id {
			return true
		}
	}
	return false
}

func JoinMeetingDb(conn *utils.MongoConnection,join_meeting utils.JoinMeeting) int {
	ctx := context.Background()
	m,err := primitive.ObjectIDFromHex(join_meeting.MeetingId)
	if err != nil {
		fmt.Printf("meetingid err %v",err)
		return http.StatusBadRequest
	}
	u,err := primitive.ObjectIDFromHex(join_meeting.UserId)
	if err != nil {
		fmt.Printf("userid err %s %v",join_meeting.UserId,err)
		return http.StatusBadRequest
	}
	meeting_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.MEETINGS)
	filterFindMember := bson.D{
		{
				"_id",m,
		},
	}
	resCheck := meeting_collection.FindOne(ctx,filterFindMember)
	var meeting utils.Meeting
	if err := resCheck.Decode(&meeting); err != nil  {
		return http.StatusBadRequest
	}
	
	if !isIdInArray(meeting.Members,join_meeting.UserId) {
		return http.StatusUnauthorized
	}
	
	update := bson.D{
		{"$addToSet",bson.D{
			{"onlineMembers",u},
		}},
	}
	res,err := meeting_collection.UpdateOne(
		ctx,
		bson.D{{"_id",m}},
		update,
	)
	if err != nil || res == nil {
		fmt.Printf("something went wrong with update %v",err)
		return http.StatusBadGateway
	}

	return http.StatusOK
}
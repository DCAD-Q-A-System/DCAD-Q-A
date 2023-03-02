package web_sockets

import (
	"fmt"
	"net/http"

	"dcad_q_a_system.com/meeting"
	"dcad_q_a_system.com/utils"

	"github.com/gorilla/websocket"
)


var wsupgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}
func SetUpSocketServer(conn *utils.MongoConnection,pool *Pool, w http.ResponseWriter, r *http.Request,
		meetingId string, userId string, username string) {
	fmt.Println("WebSocket Endpoint Hit")
	sock_conn, err := Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &Client{
		Conn: sock_conn,
		Pool: pool,
		ID: userId,
		MeetingId: meetingId,
		Username: username,
	}

	if client.MeetingId != "" && client.ID != "" {
		errNo := meeting.JoinMeetingDb(conn, utils.JoinMeeting{
			MeetingId: client.MeetingId,
			UserId: client.ID,
		})
		if errNo != http.StatusOK {
			fmt.Println("couldn't join via db")
			client.Conn.WriteJSON(map[string]string{
				"error":"UNAUTHORISED",	
			})
			return
		} else {
			fmt.Println("joined via db")
		}

	}else{
		fmt.Println("new client is a guest")
	}
	pool.Register <- client

	cookie,err := r.Cookie("token")
	if err != nil {
		fmt.Printf("cookie not found %v",err)
		client.Read(conn,"")
	} else {
		client.Read(conn,cookie.Value)
	}
}
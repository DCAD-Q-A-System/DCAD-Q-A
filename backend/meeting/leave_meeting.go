package meeting

import (
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
)

func LeaveMeeting(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		
		var join_meeting utils.JoinMeeting

		if err := ctx.BindJSON(&join_meeting); err != nil {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}

		errorNo := LeaveMeetingDb(conn,&join_meeting)
		if errorNo != http.StatusOK {
			ctx.AbortWithStatus(errorNo)
			return
		}

		ctx.Status(errorNo)
	}
}
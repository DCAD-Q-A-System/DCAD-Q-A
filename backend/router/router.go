package router

import (
	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/meeting"
	"dcad_q_a_system.com/middleware"
	"dcad_q_a_system.com/utils"
	"dcad_q_a_system.com/web_sockets"
	"github.com/gin-contrib/gzip"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Router(conn *utils.MongoConnection) *gin.Engine {
	server := gin.Default()
	
	
	// handles all usual routes on frontend and hands it to React frontend
	server.Use(static.Serve("/", static.LocalFile("./web", true)))

	// Handles miscallaneous route
	server.NoRoute(func (c *gin.Context)  {
		c.File("./web")
	})
	
	// compress content to reach faster
	server.Use(gzip.Gzip(gzip.BestSpeed))
	auth_middleware := middleware.AuthenticateRequestMiddleware()
	superGroup := server.Group("/api")
	{
		superGroup.POST("/login",auth.Login(conn))
		superGroup.GET("/get-all-messages",GetAll(conn))
		superGroup.GET("/get-all-meetings",meeting.GetAllMeetings(conn))
		superGroup.POST("/create-meeting",auth_middleware,meeting.InsertMeeting(conn))
		superGroup.PUT("/edit-meeting",auth_middleware,meeting.EditMeeting(conn))
		superGroup.PUT("/join-meeting",auth_middleware,meeting.JoinMeeting(conn))
		superGroup.PUT("/leave-meeting",auth_middleware,meeting.LeaveMeeting(conn))
	}
	

	pool := web_sockets.NewPool()
	go pool.Start()
	server.GET("/ws",func(ctx *gin.Context) {
		web_sockets.SetUpSocketServer(conn,pool,ctx.Writer,ctx.Request)
	})
	
	
	return server
}
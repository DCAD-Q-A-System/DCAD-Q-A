package router

import (
	"net/http"
	"time"

	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/meeting"
	"dcad_q_a_system.com/middleware"
	"dcad_q_a_system.com/users"
	"dcad_q_a_system.com/utils"
	"dcad_q_a_system.com/web_sockets"
	"github.com/gin-contrib/cors"
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

	server.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET","POST","PUT", "PATCH","DELETE"},
		AllowHeaders:     []string{"Origin","Set-Cookie","Access-Control-Allow-Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		MaxAge: 12 * time.Hour,
	}))
	auth_middleware := middleware.AuthenticateRequestMiddleware()
	
	priveleged_middleware := middleware.AuthenticatedUserPrivelageMiddleware([]string{"PANELLIST","ADMIN"})
	super_privelaged_middleware := middleware.AuthenticatedUserPrivelageMiddleware([]string{"ADMIN"})
	superGroup := server.Group("/api")
	{
		superGroup.POST("/login",auth.Login(conn))
		superGroup.POST("/logout",auth.Logout)
		superGroup.GET("/refresh",middleware.HandleCheckIfLoggedIn)
		superGroup.GET("/get-all-messages",GetAll(conn))
		superGroup.GET("/get-all-meetings",meeting.GetAllMeetings(conn))
		superGroup.GET("/get-all-users-in-meeting",priveleged_middleware,users.GetAllUsersInMeeting(conn))
		superGroup.GET("/get-all-users",super_privelaged_middleware,users.GetAllUsers(conn))
		superGroup.GET("/get-user-suggestions",priveleged_middleware,users.GetUserSuggestions(conn))
		superGroup.GET("/get-user",super_privelaged_middleware,users.GetUser(conn))
		superGroup.GET("/get-meeting",priveleged_middleware,meeting.GetMeeting(conn))
		superGroup.POST("/create-meeting",priveleged_middleware,meeting.InsertMeeting(conn))
		superGroup.POST("/create-user",super_privelaged_middleware,users.CreateUser(conn))
		superGroup.PUT("/edit-meeting",priveleged_middleware,meeting.EditMeeting(conn))
		superGroup.PUT("/edit-user",super_privelaged_middleware,users.EditUser(conn))
		superGroup.PUT("/edit-user-password",super_privelaged_middleware,users.EditUserPassword(conn))
		superGroup.PUT("/join-meeting",auth_middleware,meeting.JoinMeeting(conn))
		superGroup.PUT("/leave-meeting",auth_middleware,meeting.LeaveMeeting(conn))
		superGroup.PUT("/ban-user",priveleged_middleware,users.BanUser(conn))

		superGroup.DELETE("/delete-user",super_privelaged_middleware,users.DeleteUser(conn))
		superGroup.DELETE("/end-meeting",priveleged_middleware,meeting.EndMeeting(conn))
	}
	pool := web_sockets.NewPool()
	go pool.Start(conn)
	server.GET("/ws",func(ctx *gin.Context) {
		meetingId := ctx.Query("meetingId")
		userId := ctx.Query("userId")
		username := ctx.Query("username")
		if meetingId == "" && userId == "" && username == "" {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}
		// c,err:=ctx.Cookie("token")
		// fmt.Println(c,err)
		web_sockets.SetUpSocketServer(conn,pool,ctx,
			meetingId,userId,username,
		)
	})

	
	
	return server
}
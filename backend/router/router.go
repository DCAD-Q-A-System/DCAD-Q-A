package router

import (
	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/utils"
	"github.com/gin-contrib/gzip"
	socketio "github.com/googollee/go-socket.io"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Router(conn *utils.MongoConnection, socket_server *socketio.Server) *gin.Engine {
	server := gin.Default()
	
	
	// handles all usual routes on frontend and hands it to React frontend
	server.Use(static.Serve("/", static.LocalFile("./web", true)))

	// Handles miscallaneous route
	server.NoRoute(func (c *gin.Context)  {
		c.File("./web")
	})
	
	// compress content to reach faster
	server.Use(gzip.Gzip(gzip.BestSpeed))

	// server.Use(cors.New(cors.Config{
	// 	AllowMethods:     []string{"GET","POST","PUT", "PATCH","DELETE"},
	// 	AllowHeaders:     []string{"Origin","Set-Cookie","Access-Control-Allow-Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	AllowOriginFunc: func(origin string) bool {
	// 	 return strings.HasPrefix(origin,utils.DEVELOPMENT_CLIENT_URL) || strings.HasPrefix(origin,utils.PRODUCTION_CLIENT_URL) || strings.HasPrefix(origin,utils.DEVELOPMENT_SERVER_URL)
	// 	},
	// 	MaxAge: 12 * time.Hour,
		
		
	// }))

	
	// auth := login.AuthenticateRequestMiddleware()
	
	// server.GET("/api/refresh",login.HandleCheckIfLoggedIn)
	// server.GET("/api/get-client-id",func(ctx *gin.Context) {
	// 	ctx.String(http.StatusOK,os.Getenv("REACT_APP_GOOGLE_CLIENT_ID"))
	// })

	// server.GET("/api/get-post/id/:file_id",posts.GetPost)

	// server.GET("/api/get-all-posts/:post_type",posts.GetAllPosts)

	// server.GET("/api/get-all-posts-length/:post_type",posts.GetAllPostsLength)
	server.POST("/login",auth.Login(conn))
	server.GET("/get-all-messages",GetAll(conn))


	server.GET("/sockets/",gin.WrapH(socket_server))
	server.POST("/sockets/",gin.WrapH(socket_server))

	// server.POST("/google/logout",auth,login.HandleLogout)
	// server.POST("/api/insert-post/:post_type",auth,posts.InsertPost)
	// // in case client wants to enable uploading of docs instead 
	// // of html
	// //server.POST("/api/upload/:post_type",auth,posts.UploadPost)

	// server.PUT("/api/update-post/:post_id",auth,posts.UpdatePost)
	// server.PUT("/api/backup-posts/:post_type",auth,posts.BackupPosts)
	// server.PUT("/api/rename-posts/",auth,posts.RenamePosts)

	// server.DELETE("/api/delete-posts/:post_type",auth,posts.DeletePosts)

	



	return server
}
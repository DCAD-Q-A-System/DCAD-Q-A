package users

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetUserSuggestions(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		username := c.Query("username")
		if username == "" {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		users_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.USERS)
		regex := primitive.Regex{
			Pattern:fmt.Sprintf("^%s.",username),
			Options: "i",
		}
		filter := bson.D{
			{"username",regex},
		}
		results, err :=users_collection.Find(ctx,filter,options.Find())
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		var users []utils.User
		if err = results.All(ctx,&users);err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		usersJson := make([]utils.SocketMember,len(users))
		for i,u := range users {
			usersJson[i] = utils.SocketMember{
				Username: u.Username,
				UserId: u.Id.Hex(),
			}
		}

		c.JSON(http.StatusOK,usersJson)
		
	}
}
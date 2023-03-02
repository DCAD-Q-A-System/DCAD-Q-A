package users

import (
	"context"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetUser(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		userId := c.Query("userId")
		users_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.USERS)

		userIdObj, err := primitive.ObjectIDFromHex(userId)

		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		filter := bson.D{
			{"_id",userIdObj},
		}

		results := users_collection.FindOne(ctx,filter,options.FindOne())
		if results.Err() != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		var user utils.User
		if err = results.Decode(&user);err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}


		userJson := utils.UserJson{
			Username: user.Username,
			UserId: user.Id.Hex(),
			Password: "",
			Type: user.Type,
		}
		

		c.JSON(http.StatusOK,userJson)
	}
}
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
		userId := c.Query("userId")

		userJson,errNo := GetUserDb(conn,userId)
		if errNo != http.StatusOK {
			c.AbortWithStatus(errNo)
		}
		c.JSON(http.StatusOK,userJson)
	}
}

func GetUserDb(conn *utils.MongoConnection, userId string) (utils.UserJson,int) {
	ctx := context.Background()
	users_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.USERS)
	userIdObj, err := primitive.ObjectIDFromHex(userId)
	var userJson utils.UserJson

	if err != nil {
		return userJson,http.StatusBadRequest
	}

	filter := bson.D{
		{"_id",userIdObj},
	}

	results := users_collection.FindOne(ctx,filter,options.FindOne())
	if results.Err() != nil {
		return userJson,http.StatusBadRequest
	}
	var user utils.User
	if err = results.Decode(&user);err != nil {
		return userJson,http.StatusBadGateway
	}


	userJson = utils.UserJson{
		Username: user.Username,
		UserId: user.Id.Hex(),
		Password: "",
		Type: user.Type,
	}

	return userJson,http.StatusOK
}
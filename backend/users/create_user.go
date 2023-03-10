package users

import (
	"context"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)


const (
	PW_SALT_BYTES = 32
)

func CreateUser(conn *utils.MongoConnection) gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx := context.Background()
		var user utils.UserJson
		
		if err := c.BindJSON(&user); err != nil {
			fmt.Printf("bad bind %v",err)
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		} 

		if !utils.USER_CREATION_ALLOWED_TYPES[user.Type]{
			fmt.Printf("bad type\n")
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}

		user_collection := conn.Client.Database(utils.DB_NAME).Collection(utils.USERS)

		
		// verifying new user has unique username
		filter := bson.D{
			{"username",user.Username},
		}
		res := user_collection.FindOne(ctx,filter,options.FindOne())
		if res.Err() == nil {
			c.AbortWithStatus(http.StatusConflict)
			return 
		}

		salt,err := auth.CreateSalt()
		if err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}
		
		password := auth.CreateHash(user.Password,salt)
		
		// inserting new user
		_,err = user_collection.InsertOne(ctx,map[string]string{
			"username":user.Username,
			"password":password,
			"salt":salt,
			"type":user.Type,
		},options.InsertOne())
		if err != nil {
			c.AbortWithStatus(http.StatusBadGateway)
			return
		}

		c.Status(http.StatusOK)

		
	}
}
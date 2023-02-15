package auth

import (
	"context"
	"crypto/sha256"
	"fmt"
	"net/http"

	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func Login(conn *utils.MongoConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body utils.LoginRequest;

		if err := c.BindJSON(&body); err != nil {
			fmt.Printf("json body err,%v", err)
			c.AbortWithStatus(http.StatusBadRequest)
			return 
		}
		
		
		collection := conn.Client.Database(utils.DB_NAME).Collection(utils.USERS,options.Collection())
		result := collection.FindOne(context.Background(),bson.M{"username":body.Username})
		// result := collection.FindOne(context.TODO(),bson.M{"username":body.Username,"password":body.Password},options.FindOne())
		err := result.Err()
		if err != nil {
			fmt.Printf("%v",err)
			c.AbortWithStatus(500)
			return
		}
		
		var user utils.User
		result.Decode(&user)

		if user.Type != body.Type{
			fmt.Println("incorrect type")
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		attempt := body.Password + user.Salt 
		h := sha256.New()
		h.Write([]byte(attempt))
		hashed := h.Sum(nil)
		hexString := fmt.Sprintf("%x",hashed)
		if hexString != user.Password {
			fmt.Println("wrong password supplied")
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}

		
		jwt,err := GenerateJWT(body.Username)
		if err != nil {
			fmt.Printf("%v",err)
			c.AbortWithStatus(500)
			return
		}
		c.JSON(http.StatusOK,gin.H{"jwt":jwt})
	}
}

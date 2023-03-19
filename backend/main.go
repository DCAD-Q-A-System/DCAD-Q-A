package main

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/db"
	"dcad_q_a_system.com/router"
	"dcad_q_a_system.com/utils"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading env vars %v\n",err)
	}

	// Create a new client and connect to the server
	client,err := db.Connect()
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	connection := &utils.MongoConnection{Client: client}
	gin.SetMode(gin.ReleaseMode)
	r := router.Router(connection)
	r.Run()

}
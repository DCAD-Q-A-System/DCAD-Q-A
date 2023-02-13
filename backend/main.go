package main

import (
	"context"
	"fmt"

	"dcad_q_a_system.com/db"
	"dcad_q_a_system.com/router"
	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main(){

	// Create a new client and connect to the server
	client,err := db.Connect()
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()


	// Ping the primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected and pinged.")

	connection := &utils.MongoConnection{Client: client}

	socket_server := router.SetUpSocketServer(connection)
	r := router.Router(connection,socket_server)
	r.Run()

}
package main

import (
	"context"

	"dcad_q_a_system.com/db"
	"dcad_q_a_system.com/router"
	"dcad_q_a_system.com/utils"
)

func main(){

	// Create a new client and connect to the server
	client,err := db.Connect()
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()


	connection := &utils.MongoConnection{Client: client}

	r := router.Router(connection)
	r.Run()

}
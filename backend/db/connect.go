package db

import (
	"context"
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Connect() (*mongo.Client,error) {
	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().
		ApplyURI(utils.MONGODB_URI).
		SetServerAPIOptions(serverAPIOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		fmt.Printf("error connecting %v",err)
		return &mongo.Client{},nil
	}

	err = client.Ping(ctx,readpref.Primary())
	if err != nil {
		fmt.Printf("error pinging %v",err)
		return &mongo.Client{},nil
	}
	return client,err
}
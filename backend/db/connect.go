package db

import (
	"context"

	"dcad_q_a_system.com/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() (*mongo.Client,error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(utils.MONGODB_URI))

	return client,err
}
package utils

import "go.mongodb.org/mongo-driver/mongo"

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type MongoConnection struct {
	Client *mongo.Client
}

package utils

import "context"

type MongoActions interface {
	AuthenticateUser(ctx context.Context, username string, password string) (*string,error)
}
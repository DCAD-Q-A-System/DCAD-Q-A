package auth

import (
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
)

func GenerateJWT(username string) (string, int, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	expiration := time.Now().Add(5 * time.Minute)
	claims["exp"] = expiration
	claims["authorised"] = true
	claims["user"] = username
	tokenString, err := token.SignedString(utils.JWT_KEY)
	if err != nil {
		fmt.Printf("token err %v",err)
		return "", 0,err
	}

	return tokenString, int(expiration.Unix()),nil
}
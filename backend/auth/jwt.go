package auth

import (
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
)

func GenerateJWT(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodES256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(5 * time.Minute)
	claims["authorised"] = true
	claims["user"] = username
	tokenString, err := token.SignedString(utils.JWT_KEY)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
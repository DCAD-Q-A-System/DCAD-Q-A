package auth

import (
	"errors"
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
)

func VerifyJWT(jwt_string string) bool {
	token, err := jwt.Parse(jwt_string, func(t *jwt.Token) (interface{}, error) {
		_, ok := t.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil,errors.New("error with signing token")
		}
		return utils.JWT_KEY,nil
	})
	
	fmt.Println(token)
	if err != nil {
		return false
	}
	mapClaims := token.Claims.(jwt.MapClaims)
	exp,ok := mapClaims["exp"]
	if !ok {
		return false
	}
	expiryDateString := exp.(string)
	expiryDate,err := time.Parse(time.RFC3339,expiryDateString)
	if err != nil {
		return false
	}
	if !time.Now().Before(expiryDate){
		fmt.Println("expired token")
		return false
	}
	return token.Valid
}
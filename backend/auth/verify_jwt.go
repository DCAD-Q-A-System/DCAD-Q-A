package auth

import (
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func VerifyJWT(c *gin.Context,jwt_string string) bool {
	claims:= &utils.JwtClaims{}
	token, err := jwt.ParseWithClaims(jwt_string,claims, func(t *jwt.Token) (interface{}, error) {
		return utils.JWT_KEY,nil
	})
	
	fmt.Println(token)
	if err != nil {
		if claims.ExpiresAt <= time.Now().Unix(){
			return RefreshJWT(c,*claims)
		}
		return false
	}
	if !token.Valid {
		fmt.Printf("tkn not valid %v",err)
		return false
	}
	return token.Valid
}

func VerifyJWTSocket(jwt_string string) bool {
	claims:= &utils.JwtClaims{}
	token, err := jwt.ParseWithClaims(jwt_string,claims, func(t *jwt.Token) (interface{}, error) {
		return utils.JWT_KEY,nil
	})
	
	fmt.Println(token)
	if err != nil {
		return false
	}
	if !token.Valid {
		fmt.Printf("tkn not valid %v",err)
		return false
	}
	return token.Valid
}
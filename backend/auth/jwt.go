package auth

import (
	"fmt"
	"time"

	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func GenerateJWT(username string,user_id string,user_type string) (string, int, error) {
	
	expiration := time.Now().Add(20 * time.Minute)
	claims := &utils.JwtClaims{
		Username:username,
		UserId:user_id,
		Type: user_type,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiration.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,claims)
	tokenString, err := token.SignedString(utils.JWT_KEY)
	if err != nil {
		fmt.Printf("token err %v",err)
		return "", 0,err
	}

	return tokenString, int(expiration.Unix()),nil
}

func RefreshJWT(c *gin.Context, claims utils.JwtClaims) bool{
	
	// if time.Until(time.Unix(claims.ExpiresAt,0))>30*time.Second{
	// 	c.Status(http.StatusContinue)
	// 	return
	// }

	expirationTime := time.Now().Add(20 * time.Minute)
	claims.ExpiresAt = expirationTime.Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(utils.JWT_KEY)
	if err!= nil {
		fmt.Printf("cant sign token %v",err)
		return false
	}
	
	c.SetCookie(
		"token",
		tokenStr,
		int(expirationTime.Unix()),
		"/",
		c.Request.URL.Hostname(),
		true,
		true,
	)
	return true
}

package middleware

import (
	"fmt"
	"net/http"
	"time"

	"dcad_q_a_system.com/auth"
	"dcad_q_a_system.com/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)


func isRequestAuthenticated(c *gin.Context) bool {
	cookie, err := c.Request.Cookie("token")
	

	if err != nil || cookie.Value == "" {
		fmt.Printf("cookie not found %v",err)
		return false
	}

	return auth.VerifyJWT(c,cookie.Value)
}
// inbetween middleware checking request is authenticated
// before allowing request to carry further along
func AuthenticateRequestMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if isRequestAuthenticated(ctx) {
			ctx.Next()
			return 
		}else{
			ctx.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{"Message":"Unauthorised"})
			return
		}
	}
}

func HandleCheckIfLoggedIn(c *gin.Context) {
	claims,err := CheckCookieReturnUserInfo(c)
	if err != nil  {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	if claims.Username == "" {
		c.AbortWithStatus(http.StatusBadGateway)
		return
	}
	fmt.Println(claims)
	c.JSON(http.StatusOK,gin.H{
		"username":claims.Username,
		"userId":claims.UserId,
		"type":claims.Type,
	})
}

func CheckCookieReturnUserInfo(c *gin.Context) (utils.JwtClaims,error){
	cookie,err := c.Request.Cookie("token")
	if err != nil {
		fmt.Printf("cookie not found %v",err)
		return utils.JwtClaims{},err
	}

	tokenString := cookie.Value
	claims := &utils.JwtClaims{}

	tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return utils.JWT_KEY, nil
	})
	if err != nil {
		fmt.Println(claims.ExpiresAt)
		if claims.ExpiresAt <= time.Now().Unix() && auth.RefreshJWT(c,*claims) {
				return *claims,nil
		}
		fmt.Printf("tkn cant be parsed %v",err)
		return utils.JwtClaims{},err
	}
	if !tkn.Valid{
		
		fmt.Printf("tkn not valid %v",err)
		return utils.JwtClaims{},err
	}

	return *claims,nil
}
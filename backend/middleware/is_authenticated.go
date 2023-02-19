package middleware

import (
	"fmt"
	"net/http"

	"dcad_q_a_system.com/auth"
	"github.com/gin-gonic/gin"
)


func isRequestAuthenticated(c *gin.Context) bool {
	cookie, err := c.Request.Cookie("token")
	

	if err != nil || cookie.Value == "" {
		fmt.Printf("cookie not found %v",err)
		return false
	}

	return auth.VerifyJWT(cookie.Value)
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
package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Logout(c *gin.Context) {
	c.SetCookie(
		"token",
		"",
		0,
		"/",
		c.Request.URL.Hostname(),
		false,
		true,
	)
	c.Status(http.StatusOK)
}
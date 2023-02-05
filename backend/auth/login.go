package auth

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"net/http"
// 	"os"
// 	"strings"
// 	"time"

// 	"github.com/dgrijalva/jwt-go"
// 	"github.com/gin-gonic/gin"
// 	"google.golang.org/api/idtoken"
// )

// func HandleLogin(c *gin.Context) {
// 	var bod utils.GoogleData
// 	if err := c.BindJSON(&bod); err != nil {
// 		fmt.Printf("json google body err,%v", err)
// 		c.AbortWithStatus(http.StatusBadRequest)
// 		return
// 	}
// 	ctx := context.Background()

// 	var s = struct {
// 		Type string `json:"type"`
// 		ProjectId string `json:"project_id"`
// 		PrivateKeyId string `json:"private_key_id"`

// 		Email      string `json:"client_email"`
// 		PrivateKey string `json:"private_key"`
// 		ClientId string `json:"client_id"`
// 		AuthURI string `json:"auth_uri"`
// 		TokenURI string `json:"token_uri"`
// 		AuthProvider string `json:"auth_provider_x509_cert_url"`
// 		Cert string `json:"client_x509_cert_url"`
// 	}{}
// 	// parsing credentials from env
// 	err := json.Unmarshal([]byte(os.Getenv("CREDENTIALS")), &s)
// 	if err != nil {
// 		fmt.Printf("secret marshal err %v",err)
// 	}
// 	// object needed to pass to verify token passed
// 	second_json := fmt.Sprintf(
// 		`{"client_email":"%s","private_key":"%s","type":"%s","project_id":"%s","private_key_id":"%s",
// 		"client_id":"%s","auth_uri":"%s","token_uri":"%s","auth_provider_x509_cert_url":"%s",
// 		"client_x509_cert_url":"%s"}`,
// 		s.Email,
// 		s.PrivateKey,
// 		s.Type,
// 		s.ProjectId,
// 		s.PrivateKeyId,
// 		s.ClientId,
// 		s.AuthURI,
// 		s.TokenURI,
// 		s.AuthProvider,
// 		s.Cert,
// 	)

// 	// verify google token obtained by request from logging in with google
// 	// on the frontend
// 	validator, err := idtoken.NewValidator(ctx,idtoken.WithCredentialsJSON([]byte(second_json)))
// 	if err != nil {
// 		fmt.Printf("validator err %v", err)
// 		c.AbortWithStatus(http.StatusBadGateway)
// 		return
// 	}

// 	// validate if client id and token given are valid
// 	payload, err := validator.Validate(ctx, bod.Token, os.Getenv("REACT_APP_GOOGLE_CLIENT_ID"))
// 	if err != nil {
// 		fmt.Printf("validating err %v", err)
// 		c.AbortWithStatus(http.StatusBadRequest)
// 		return
// 	}

// 	// check if email logged in is allowed, bc any google user could
// 	// technically logged in unless it's an authorised one
// 	if !strings.Contains(os.Getenv("ALLOWED_EMAILS"),fmt.Sprintf("%v",payload.Claims["email"])) {
// 		c.AbortWithStatus(http.StatusUnauthorized)
// 		return
// 	}

// 	// create a JWT token to be refreshed every 5 minutes to verify the client
// 	// and keep them logged in
// 	expirationTime := time.Now().Add(5 * time.Minute)
// 	claims := &utils.JwtClaims{
// 		Name:       payload.Claims["name"],
// 		Email:      payload.Claims["email"],
// 		PictureURL: payload.Claims["picture"],
// 		StandardClaims: jwt.StandardClaims{
// 			ExpiresAt: expirationTime.Unix(),
// 		},
// 	}

// 	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

// 	jwtTokenString, err := jwtToken.SignedString(utils.JwtKey)
// 	if err != nil {
// 		fmt.Printf("can't jwt sign %v", err)
// 		c.AbortWithStatus(http.StatusBadGateway)
// 		return
// 	}

// 	c.SetCookie(
// 		"token",
// 		jwtTokenString,
// 		int(expirationTime.Unix()),
// 		"/",
// 		c.Request.URL.Hostname(),
// 		true,
// 		true,
// 	)

// 	c.JSON(http.StatusOK,
// 		gin.H{
// 			"name":    payload.Claims["name"],
// 			"email":   payload.Claims["email"],
// 			"picture": payload.Claims["picture"],
// 		})
// }
package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"golang.org/x/oauth2/jwt"
	"golang.org/x/oauth2/microsoft"
)

func GetJWTConfig(secretFile string)(*jwt.Config,error){
	var s = struct {
		Email      string `json:"client_email"`
		PrivateKey string `json:"private_key"`
	}{}
	err := json.Unmarshal([]byte(secretFile), &s)
	if err != nil {
		fmt.Printf("secret marshal err %v",err)
		return nil,err
	}
	second_json := fmt.Sprintf(`{"client_email":"%s","private_key":"%s"}`,s.Email,s.PrivateKey)
	json.Unmarshal([]byte(second_json),&s)
	config := &jwt.Config{
		Email:      s.Email,
		PrivateKey: []byte(s.PrivateKey),
		Scopes: []string{
			// add microsoft scope URLs 
		},
		TokenURL: microsoft.LiveConnectEndpoint.TokenURL,
	}
	return config,nil
	
}
//Use Service account
// email string,privateKey string
func ServiceAccount(secretFile string) (*http.Client,error) {
	
	config,err:= GetJWTConfig(secretFile)
	if err != nil {
		return nil,err
	}
	client := config.Client(context.Background())
	return client,nil
}

func GetServiceClient() (*http.Client,error){
	client,err:= ServiceAccount(os.Getenv("CREDENTIALS"))
	if err != nil {
		return nil,err
	}
	return client,nil
}
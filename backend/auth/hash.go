package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io"
)

const (
	PW_SALT_BYTES = 32
)

func CreateSalt() (string, error) {
	salt := make([]byte, PW_SALT_BYTES)
	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		fmt.Printf("salt err %v\n", err)
		return "",err
	}
	return base64.RawStdEncoding.EncodeToString(salt),nil
}

func CreateHash(password string,salt string) string {
	attempt := password + salt
	h := sha256.New()
	h.Write([]byte(attempt))
	hashed := h.Sum(nil)
	hexString := fmt.Sprintf("%x",hashed)
	return hexString
}
package middlewares

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func JwtProtected(c *fiber.Ctx) error {
	accessToken := c.Cookies("accessToken")

	fmt.Println("accessToken", accessToken)

	if accessToken == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Missing or invalid token",
		})
	}

	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(accessToken, claims, func(t *jwt.Token) (any, error) {
		return []byte(os.Getenv("JWT_ACCESS_SECRET")), nil
	})

	fmt.Println("token", token)

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Missing or invalid token",
		})
	}

	fmt.Println("claims", c.Locals("userID", claims["userID"]))
	c.Locals("userID", claims["userID"])
	fmt.Println("mid user", c.Locals("userID", claims["userID"]))
	return c.Next()
}

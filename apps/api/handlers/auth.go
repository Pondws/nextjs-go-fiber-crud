package handlers

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/pondws/api/database"
	"github.com/pondws/api/models"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return err
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"massage": "User registered",
		"data":    user,
	})
}

func Login(c *fiber.Ctx) error {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var user models.User

	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := database.DB.Where("email = ?", body.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID,
		"exp":    time.Now().Add(24 * time.Hour).Unix(),
	})

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID,
		"exp":    time.Now().Add(7 * 24 * time.Hour).Unix(),
	})

	accessString, _ := accessToken.SignedString([]byte(os.Getenv("JWT_ACCESS_SECRET")))
	refreshString, _ := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET")))

	c.Cookie((&fiber.Cookie{
		Name:     "accessToken",
		Value:    accessString,
		Expires:  time.Now().Add(72 * time.Hour),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "None",
	}))

	c.Cookie((&fiber.Cookie{
		Name:     "refreshToken",
		Value:    refreshString,
		Expires:  time.Now().Add(72 * time.Hour),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "None",
	}))

	return c.JSON(fiber.Map{
		"massage": "Login Successful",
		"data":    user,
	})
}

func GetMe(c *fiber.Ctx) error {
	fmt.Println("local userID", c.Locals("userID"))
	userID := c.Locals("userID")

	if userID == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	var user models.User

	if err := database.DB.First(&user, "id = ?", userID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	return c.JSON(fiber.Map{
		"data": user,
	})
}

func Logout(c *fiber.Ctx) error {
	c.ClearCookie("accessToken")
	c.ClearCookie("refreshToken")
	return c.JSON(fiber.Map{
		"message": "Logged out successfully",
	})
}

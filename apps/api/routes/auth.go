package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/handlers"
	"github.com/pondws/api/middlewares"
)

func AuthRoutes(app *fiber.App) {
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)
	app.Post("/logout", handlers.Logout)
	app.Use(middlewares.JwtProtected)
	app.Get("/me", handlers.GetMe)
}

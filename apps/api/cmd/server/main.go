package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pondws/api/database"
	"github.com/pondws/api/routes"
)

func main() {
	app := fiber.New()

	database.ConnectDB()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowMethods: "GET, POST, PUT, DELETE",
		AllowHeaders: "Content-Type, Authorization",
	}))

	routes.PostRoutes(app)

	app.Listen(":8080")
}

package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pondws/api/database"
	"github.com/pondws/api/routes"
)

const AllowOrigins = "http://localhost:3000, https://oms-one-tau.vercel.app"

func main() {
	app := fiber.New()

	database.ConnectDB()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     AllowOrigins,
		AllowCredentials: true,
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowHeaders:     "Content-Type, Authorization",
	}))

	routes.AuthRoutes(app)
	routes.PostRoutes(app)
	routes.ProductTagRoutes(app)

	app.Listen(":8080")
}

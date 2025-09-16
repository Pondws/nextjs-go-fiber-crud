package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/handlers"
)

func PostRoutes(app *fiber.App) {
	app.Post("/post", handlers.CreatePost)
	app.Get("/post", handlers.GetPosts)
	app.Get("/post/:id", handlers.GetPostByID)
	app.Put("/post/:id", handlers.UpdatePost)
	app.Delete("/post/:id", handlers.DeletePost)
}

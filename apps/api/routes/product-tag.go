package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/handlers"
	"github.com/pondws/api/middlewares"
)

func ProductTagRoutes(app *fiber.App) {
	productTag := app.Group("/product-tag", middlewares.JwtProtected)
	productTag.Post("/", handlers.CreateProductTag)
	productTag.Get("/", handlers.GetProductTag)
	productTag.Get("/:id", handlers.GetProductTagByID)
	productTag.Put("/:id", handlers.UpdateProductTag)
	productTag.Delete("/:id", handlers.DeleteProductTag)
}

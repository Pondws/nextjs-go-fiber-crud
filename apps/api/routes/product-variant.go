package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/handlers"
	"github.com/pondws/api/middlewares"
)

func ProductVariantRoutes(app *fiber.App) {
	productVariant := app.Group("/product-variant", middlewares.JwtProtected)
	productVariant.Post("/", handlers.CreateProductVariant)
	productVariant.Get("/", handlers.GetProductVariant)
	productVariant.Get("/:id", handlers.GetProductVariantByID)
	productVariant.Put("/:id", handlers.UpdateProductVariant)
	productVariant.Delete("/:id", handlers.DeleteProductVariant)
}

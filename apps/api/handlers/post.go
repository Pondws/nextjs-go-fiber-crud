package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/database"
	"github.com/pondws/api/models"
)

var DB = database.DB

func CreatePost(c *fiber.Ctx) error {
	post := new(models.Post)

	if err := c.BodyParser(post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if err := database.DB.Create(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot create post",
			"error":   err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "Post created successfully",
		"data":    post,
	})
}

func GetPosts(c *fiber.Ctx) error {
	posts := []models.Post{}

	if err := database.DB.Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot get posts",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Posts fetched successfully",
		"data":    posts,
	})
}

func GetPostByID(c *fiber.Ctx) error {
	id := c.Params("id")
	post := models.Post{}

	if err := database.DB.First(&post, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot get posts",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Post fetched successfully",
		"data":    post,
	})
}

func UpdatePost(c *fiber.Ctx) error {
	id := c.Params("id")
	var post models.Post

	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.DB.Model(&post).Where("id = ?", id).Updates(post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot get posts",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Post fetched successfully",
		"data":    post,
	})
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	post := models.Post{}

	if err := database.DB.Delete(&post, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot detele post",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Post deleted successfully",
	})
}

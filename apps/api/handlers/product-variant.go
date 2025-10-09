package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/database"
	"github.com/pondws/api/models"
)

func CreateProductVariant(c *fiber.Ctx) error {
	productVariant := new(models.ProductVariant)

	if err := c.BodyParser(&productVariant); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if productVariant.Name == "" {
		return c.Status(422).JSON(fiber.Map{
			"message": "Name is required",
		})
	}

	if err := database.DB.Create(&productVariant).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "ชื่อตัวเลือกสินค้าซ้ำ",
			"error":   err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"data": productVariant,
	})
}

func GetProductVariant(c *fiber.Ctx) error {
	productVariants := []models.ProductVariant{}

	if err := database.DB.Preload("Options").Find(&productVariants).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": productVariants,
	})
}

func GetProductVariantByID(c *fiber.Ctx) error {
	id := c.Params("id")
	productVariant := models.ProductVariant{}

	if err := database.DB.Preload("Options").First(&productVariant, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": productVariant,
	})
}

func UpdateProductVariant(c *fiber.Ctx) error {
	id := c.Params("id")
	var payload models.ProductVariant

	var productVariant models.ProductVariant
	var productVariantOption models.ProductVariantOption

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.DB.Preload("Options").First(&productVariant, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON("error", err.Error())
	}

	tx := database.DB.Begin()

	if err := tx.Model(&productVariant).Updates(models.ProductVariant{
		Name:        payload.Name,
		Description: payload.Description,
		Status:      payload.Status,
	}).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, opt := range payload.Options {
		if err := tx.Model(&productVariantOption).
			Where("id = ?", opt.ID).
			Updates(models.ProductVariantOption{
				Name:  opt.Name,
				Order: opt.Order,
			}).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	tx.Commit()

	if err := database.DB.Preload("Options").First(&productVariant, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON("error", err.Error())
	}

	return c.Status(200).JSON(fiber.Map{
		"data": productVariant,
	})
}

func DeleteProductVariant(c *fiber.Ctx) error {
	id := c.Params("id")
	productVariant := models.ProductVariant{}
	productVariantOption := models.ProductVariantOption{}

	database.DB.Where("variant_id = ?", id).Delete(&productVariantOption)

	if err := database.DB.Delete(&productVariant, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "ลบข้อมูลสำเร็จ",
	})
}

package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pondws/api/database"
	"github.com/pondws/api/models"
	"github.com/pondws/api/utils"
)

func CreateProductTag(c *fiber.Ctx) error {
	productTag := new(models.ProductTag)

	if err := c.BodyParser(productTag); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	if productTag.Name == "" {
		return c.Status(422).JSON(fiber.Map{
			"message": "Name is required",
		})
	}

	if err := database.DB.Create(&productTag).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "ชื่อแท็กสินค้าซ้ำ",
			"error":   err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "Product Tag create successfull",
		"data":    productTag,
	})
}

func GetProductTag(c *fiber.Ctx) error {
	res, err := utils.Paginate[models.ProductTag](c, database.DB.Model(&models.ProductTag{}))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot get Product Tags",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data":      res.Data,
		"totalRows": res.TotalRows,
	})
}

func GetProductTagByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var productTag models.ProductTag

	if err := database.DB.First(&productTag, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot get product tag",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": productTag,
	})
}

func UpdateProductTag(c *fiber.Ctx) error {
	id := c.Params("id")
	var productTag models.ProductTag

	if err := c.BodyParser(&productTag); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.DB.Model(&productTag).Where("id = ?", id).Updates(productTag).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Cannot update product tag",
			"error":   err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"data": productTag,
	})
}

func DeleteProductTag(c *fiber.Ctx) error {
	id := c.Params("id")
	productTag := models.ProductTag{}

	if err := database.DB.Delete(&productTag, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "ไม่สามารถลบแท็กสินค้าได้ กรุณาลองใหม่อีกครั้ง",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "ลบแท็กสินค้าเรียบร้อยแล้ว",
	})
}

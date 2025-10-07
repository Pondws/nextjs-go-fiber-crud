package utils

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Pagination[T any] struct {
	Data      []T   `json:"data"`
	TotalRows int64 `json:"totalRows,omitempty"`
	Page      int   `json:"page"`
	Limit     int   `json:"limit"`
	Offset    int   `json:"offset"`
}

type PaginationRequest struct {
	Page  int    `json:"page"`
	Limit int    `json:"limit"`
	Sort  string `json:"sort"`
}

func Paginate[T any](c *fiber.Ctx, db *gorm.DB) (Pagination[T], error) {
	var result Pagination[T]
	var out []T
	var totalRows int64

	// อ่าน query params
	page := 1
	limit := 10
	sort := "updated_at desc"

	if qPage := c.Query("page"); qPage != "" {
		if p, err := strconv.Atoi(qPage); err == nil && p > 0 {
			page = p
		}
	}

	if qLimit := c.Query("limit"); qLimit != "" {
		if l, err := strconv.Atoi(qLimit); err == nil && l > 0 {
			limit = l
		}
	}

	if qSort := c.Query("sort"); qSort != "" {
		sort = qSort
	}

	// อ่านจาก JSON body (override query params ถ้ามี)
	var req PaginationRequest
	if err := c.BodyParser(&req); err == nil {
		if req.Page > 0 {
			page = req.Page
		}
		if req.Limit > 0 {
			limit = req.Limit
		}
		if req.Sort != "" {
			sort = req.Sort
		}
	}

	offset := (page - 1) * limit

	// นับ totalRows
	if err := db.Count(&totalRows).Error; err != nil {
		return result, err
	}

	// query data
	if err := db.Order(sort).Limit(limit).Offset(offset).Find(&out).Error; err != nil {
		return result, err
	}

	result.Data = out
	result.TotalRows = totalRows
	result.Page = page
	result.Limit = limit

	return result, nil
}

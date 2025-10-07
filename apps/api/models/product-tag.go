package models

type ProductTag struct {
	BaseModel
	Name string `json:"name" gorm:"not null;unique" validate:"required"`
}

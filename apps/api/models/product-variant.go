package models

type ProductVariant struct {
	BaseModel
	Name        string                 `json:"name" gorm:"not null; unique"`
	Description string                 `json:"description"`
	Status      string                 `json:"status"`
	Options     []ProductVariantOption `json:"options" gorm:"foreignKey:VariantID"`
}

type ProductVariantOption struct {
	BaseModel
	VariantID string `json:"variantID" gorm:"type:uuid;not null;index;constraint:OnDelete:CASCADE;"`
	Name      string `json:"name"`
	Order     int    `gorm:"not null;default:0"`
}

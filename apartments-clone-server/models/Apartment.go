package models

import (

	"gorm.io/gorm"
)

type Apartment struct {
	gorm.Model
	PropertyID  uint           `json:"PropertyID"`
	Unit        string         `json:"unit"`
	Bedrooms    int            `json:"bedrooms"`
	Bathrooms   float32        `json:"bathrooms"`
}
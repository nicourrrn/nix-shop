package db

import "github.com/jmoiron/sqlx"

type productRepo struct {
	connection *sqlx.DB
}

func (repo *productRepo) GetAllIngredients() (ingredients []string) {
	repo.connection.Select(&ingredients, "SELECT name FROM ingredients")
	return
}

type Product struct {
	Id    int64   `json:"id" db:"id"`
	Name  string  `json:"name" db:"name"`
	Price float32 `json:"price" db:"price"`
	Image string  `json:"image" db:"image"`
	Type  string  `json:"type" db:"type"`
}

func (repo *productRepo) GetProducts(supplierId int64) (menu []Product) {
	err := repo.connection.Select(&menu,
		"SELECT products.id, products.name, products.price, products.image, pt.name as type FROM products JOIN product_types pt on pt.id = products.type_id WHERE supplier_id = ?", supplierId)
	if err != nil {
		panic(err)
	}
	return
}

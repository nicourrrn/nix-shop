package db

import "github.com/jmoiron/sqlx"

type productRepo struct {
	connection *sqlx.DB
}

func (repo *productRepo) GetAllIngredients() (ingredients []string) {
	repo.connection.Select(&ingredients, "SELECT name FROM ingredients")
	return
}

package db

import (
	. "backend/internal/models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"log"
)

var Clients clientRepo
var Products productRepo
var Suppliers supplierRepo

func init() {
	db, err := sqlx.Open("mysql", "nix-shop-user@/nix_shop")
	if err != nil {
		log.Fatalln(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalln(err)
	}
	Clients = clientRepo{connection: db}
	Products = productRepo{connection: db}
	Suppliers = supplierRepo{connection: db}
}

func FindTypeId(types []Type, name string) int64 {
	for _, t := range types {
		if t.Name == name {
			return t.Id
		}
	}
	return -1
}

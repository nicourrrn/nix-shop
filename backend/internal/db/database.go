package db

import (
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

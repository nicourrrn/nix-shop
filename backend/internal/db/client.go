package db

import (
	"github.com/jmoiron/sqlx"
	"log"
)

type clientRepo struct {
	connection *sqlx.DB
}

func (repo *clientRepo) GetClient(key string, value interface{}) (result map[string]interface{}) {
	var err error
	switch key {
	case "ID":
		err = repo.connection.Select(result, "SELECT * FROM clients WHERE id = $1", value)
	}
	if err != nil {
		log.Fatalln(err)
	}
	return
}

//func (repo ClientRepo) NewClient(map[string]interface{}) {
//
//}

package db

import (
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
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

type ScannedClient struct {
	Name     string `db:"name"`
	Email    string `db:"email"`
	Password string `db:"password"`
}

func (repo *clientRepo) NewClient(name, email, password string) (int64, error) {
	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalln(err)
	}
	scannedClient := ScannedClient{
		Name:     name,
		Email:    email,
		Password: string(encryptedPassword),
	}
	result, err := repo.connection.NamedExec(
		"INSERT INTO clients(name, email, password) VALUE (:name, :email, :password)",
		scannedClient)
	if err != nil {
		log.Fatalln(err)
	}
	return result.LastInsertId()
}

func (repo *clientRepo) UpdateClientRefToken(id int64, refreshToken string) {
	encryptedToken, err := bcrypt.GenerateFromPassword([]byte(refreshToken), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalln(err)
	}
	_, err = repo.connection.Exec(
		"UPDATE clients SET refresh_token = ? WHERE id = ?",
		string(encryptedToken), id)
	if err != nil {
		log.Fatalln(err)
	}
}

func (repo *clientRepo) GetClientRefToken(id int64) (refToken string) {
	err := repo.connection.Get(&refToken, "SELECT refresh_token FROM clients WHERE id = ?", id)
	if err != nil {
		panic(err)
	}
	return
}

func (repo *clientRepo) LoginClient(email string, password string) (id int64) {
	client := struct {
		Id       int64  `db:"id"`
		Password string `db:"password"`
	}{}
	err := repo.connection.Get(&client, "SELECT id, password FROM clients WHERE email = ?", email)
	if err != nil {
		panic(err)
	}
	err = bcrypt.CompareHashAndPassword([]byte(client.Password), []byte(password))
	if err != nil {
		panic(err)
	}
	id = client.Id
	return
}

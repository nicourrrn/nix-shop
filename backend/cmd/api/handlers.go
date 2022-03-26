package main

import (
	"backend/internal/db"
	"backend/pkg/jwt_handler"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func GetAllIngredients(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	err := json.NewEncoder(writer).Encode(db.Products.GetAllIngredients())
	if err != nil {
		log.Fatalln(err)
	}
}

type SignUpRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func PostSignUp(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	req := SignUpRequest{}
	err := json.NewDecoder(request.Body).Decode(&req)
	if err != nil {
		log.Fatalln(err)
	}
	clientId, err := db.Clients.NewClient(req.Name, req.Email, req.Password)
	if err != nil {
		log.Fatalln(err)
	}
	pair := jwt_handler.NewTokenPair(clientId, "client")
	ref, acc, err := pair.GetStrings()
	if err != nil {
		log.Fatalln(err)
	}
	db.Clients.UpdateClientRefToken(clientId, ref)

	json.NewEncoder(writer).Encode(map[string]interface{}{
		"refreshToken": ref,
		"accessToken":  acc,
	})

}

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func PostSignIn(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}

	req := SignInRequest{}
	err := json.NewDecoder(request.Body).Decode(&req)
	if err != nil {
		panic(err)
	}

	id := db.Clients.LoginClient(req.Email, req.Password)
	ref, acc, err := jwt_handler.NewTokenPair(id, "client").GetStrings()
	db.Clients.UpdateClientRefToken(id, ref)

	err = json.NewEncoder(writer).Encode(map[string]interface{}{
		"refreshToken": ref,
		"accessToken":  acc,
	})
	if err != nil {
		panic(err)
	}
}

func GetSuppliers(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	suppliers := db.Suppliers.GetSuppliers()
	err := json.NewEncoder(writer).Encode(suppliers)
	if err != nil {
		panic(err)
	}
}

func GetSupplierMenu(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	supplierId, err := strconv.Atoi(request.URL.Query().Get("id"))
	if err != nil {
		panic(err)
	}
	err = json.NewEncoder(writer).Encode(db.Products.GetProducts(int64(supplierId)))
	if err != nil {
		panic(err)
	}
}

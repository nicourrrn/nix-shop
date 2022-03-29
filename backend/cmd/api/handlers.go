package main

import (
	"backend/internal/db"
	"backend/pkg/jwt_handler"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"strconv"
)

func GetAllIngredients(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	response := make([]string, 0)
	for _, ingr := range db.Products.GetAllIngredients() {
		response = append(response, ingr.Name)
	}
	err := json.NewEncoder(writer).Encode(response)
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
	if !(request.Method == http.MethodPost) {
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

	err = json.NewEncoder(writer).Encode(map[string]interface{}{
		"accessToken":  acc,
		"refreshToken": ref,
	})
	if err != nil {
		panic(err)
	}
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

	id, name := db.Clients.LoginClient(req.Email, req.Password)
	ref, acc, err := jwt_handler.NewTokenPair(id, "client").GetStrings()
	db.Clients.UpdateClientRefToken(id, ref)

	err = json.NewEncoder(writer).Encode(map[string]interface{}{
		"name":         name,
		"accessToken":  acc,
		"refreshToken": ref,
	})
	if err != nil {
		panic(err)
	}
}

type RefreshRequest struct {
	RefreshToken string `json:"refreshToken"`
	AccessToken  string `json:"accessToken"`
}

func PostRefresh(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	refRequest := RefreshRequest{}
	err := json.NewDecoder(request.Body).Decode(&refRequest)
	if err != nil {
		panic(err)
	}

	pair, err := jwt_handler.NewTokenPairFromStrings(refRequest.RefreshToken, refRequest.AccessToken)
	if err != nil {
		panic(err)
	}
	refToken := db.Clients.GetClientRefToken(pair.AccessToken.UserId)

	err = bcrypt.CompareHashAndPassword([]byte(refToken), []byte(refRequest.RefreshToken))
	if err != nil {
		panic(err)
	}
	ref, acc, err := jwt_handler.NewTokenPair(pair.AccessToken.UserId, "client").GetStrings()
	if err != nil {
		panic(err)
	}

	db.Clients.UpdateClientRefToken(pair.AccessToken.UserId, ref)

	err = json.NewEncoder(writer).Encode(map[string]string{
		"accessToken":  acc,
		"refreshToken": ref,
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

type PostBasketRequest struct {
	Address  string             `json:"address"`
	Products []db.ProductToBask `json:"products"`
}

func PostBasket(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
		return
	}
	accessTokenString := request.Header.Get("Access-Token")
	accessClaim, err := jwt_handler.GetClaim(accessTokenString, jwt_handler.GetAccess())
	if err != nil {
		log.Println(accessTokenString)
		panic(err)
	}
	req := PostBasketRequest{}
	err = json.NewDecoder(request.Body).Decode(&req)
	if err != nil {
		panic(err)
	}

	basketId := db.Clients.NewBacket(accessClaim.UserId, req.Address, req.Products)

	err = json.NewEncoder(writer).Encode(map[string]interface{}{
		"basketId": basketId,
	})

	if err != nil {
		panic(err)
	}
}

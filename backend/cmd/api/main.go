package main

import (
	"log"
	"net/http"
)

func main() {
	api := http.NewServeMux()

	api.HandleFunc("/ingredients", GetAllIngredients)
	api.HandleFunc("/user/signin", PostSignIn)
	api.HandleFunc("/user/signup", PostSignUp)
	api.HandleFunc("/user/refresh", PostRefresh)
	api.HandleFunc("/suppliers", GetSuppliers)
	api.HandleFunc("/products", GetSupplierMenu)

	log.Println(http.ListenAndServe(":8000", api))

}

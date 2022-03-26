package main

import (
	"log"
	"net/http"
)

func main() {
	api := http.NewServeMux()

	api.HandleFunc("/ingredients", GetAllIngredients)
	//api.Handle("/user/signin", nil)
	//api.Handle("/user/signup", nil)
	//api.Handle("/suppliers", nil)
	//api.Handle("/suppliers/", nil)

	log.Println(http.ListenAndServe(":8000", api))

}

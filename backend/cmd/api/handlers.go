package main

import (
	"backend/internal/db"
	"encoding/json"
	"log"
	"net/http"
)

func GetAllIngredients(writer http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(writer, "not allowed", http.StatusMethodNotAllowed)
	}
	err := json.NewEncoder(writer).Encode(db.Products.GetAllIngredients())
	if err != nil {
		log.Fatalln(err)
	}
}

package main

import (
	"github.com/justinas/alice"
	"log"
	"net/http"
)

func main() {
	api := http.NewServeMux()
	mainMiddleware := alice.New(AddHeaders)
	api.Handle("/ingredients", mainMiddleware.ThenFunc(GetAllIngredients))
	api.Handle("/user/signin", mainMiddleware.ThenFunc(PostSignIn))
	api.Handle("/user/signup", mainMiddleware.ThenFunc(PostSignUp))
	api.Handle("/user/refresh", mainMiddleware.ThenFunc(PostRefresh))
	api.Handle("/suppliers", mainMiddleware.ThenFunc(GetSuppliers))
	api.Handle("/products", mainMiddleware.ThenFunc(GetSupplierMenu))

	log.Println(http.ListenAndServe(":8000", api))

}

func AddHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, withCredentials")
		writer.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if request.Method != http.MethodOptions {
			next.ServeHTTP(writer, request)
		}
	})
}

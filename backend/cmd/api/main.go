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
	api.Handle("/user/logout", mainMiddleware.ThenFunc(GetLogOut))
	api.Handle("/suppliers", mainMiddleware.ThenFunc(GetSuppliers))
	api.Handle("/products", mainMiddleware.ThenFunc(GetSupplierMenu))
	api.Handle("/basket/new", mainMiddleware.ThenFunc(PostBasket))

	log.Println(http.ListenAndServe(":8000", api))

}

func AddHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, withCredentials, access-token, user-agent")
		writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if request.Method != http.MethodOptions {
			next.ServeHTTP(writer, request)
		}
	})
}

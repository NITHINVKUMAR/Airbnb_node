package app

import (
	config "AuthInGO/config/env"
	"AuthInGO/controllers"
	db "AuthInGO/db/repositories"
	"AuthInGO/router"
	"AuthInGO/services"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string // PORT
}

type Application struct {
	Config  Config
	Storage db.Storage
}

// Constructor for Config
func NewConfig() Config {
	port := config.GetString("PORT", ":8080")
	return Config{
		Addr: port,
	}
}

// Constructor for Application
func NewApplication(cfg Config) *Application {
	return &Application{
		Config:  cfg,
		Storage: *db.NewStorgage(),
	}
}

func (app *Application) Run() error {
	ur := db.NewUserRepository()
	us := services.NewUserService(ur)
	uc := controllers.NewUserContoller(us)
	uRouter := router.NewUserRouter(uc)
	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetUpRouter(uRouter),
		ReadTimeout:  10 * time.Second, // Set read timeout	to 10 seconds
		WriteTimeout: 10 * time.Second, // Set write timeout to 10 seconds
	}
	fmt.Printf("Starting server on %s\n", app.Config.Addr)
	return server.ListenAndServe()
}

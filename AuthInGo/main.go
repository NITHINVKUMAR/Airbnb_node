package main

import (
	"AuthInGO/app"
	dbConfig "AuthInGO/config/db"
	config "AuthInGO/config/env"
)

func main() {
	config.Load()
	cfg := app.NewConfig()
	app := app.NewApplication(cfg)
	dbConfig.SetUpDB()
	app.Run()
}

package main

import (
	"AuthInGO/app"
	config "AuthInGO/config/env"
)

func main() {
	config.Load()
	cfg := app.NewConfig()
	app := app.NewApplication(cfg)
	app.Run()
}

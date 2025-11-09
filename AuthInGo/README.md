install go get github.com/joho/godotenv this is to install dotenv library for loading environment variables from a .env file.
install go get -u github.com/go-chi/chi/v5 this is to install the chi router for building HTTP services in Go.
Do go get -u github.com/go-sql-driver/mysql this is to install the MySQL driver for Go

install Goose librarby for database migrations go install github.com/pressly/goose/v3/cmd/goose@latest

goose -dir "db/migrations"  create create_user_table sql use this command to create a new migration file for creating user table under db/migrations folder

goose -dir "db/migrations" mysql "root:Welcome@1@tcp(127.0.0.1:3306)/auth_dev" up This is to up the migrations to create the user table in the database

do Makefile for creating makefile commands for database migrations

install gmake utility for running makefiles 
we can just use make migrate-up to migrate all the migrations for mac use gmake migrate-up

in terminal do go get golang.org/x/crypto/bcrypt this is to install bcrypt library for hashing passwords
package config

import (
	env "AuthInGO/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetUpDB() (*sql.DB, error) {
	cfg := mysql.NewConfig()
	cfg.User = env.GetString("DB_USER", "root")
	cfg.Passwd = env.GetString("DB_PASSWORD", "root")
	cfg.Net = env.GetString("DB_NET", "tcp")
	cfg.Addr = env.GetString("DB_ADDR", "127.0.0.1:3306")
	cfg.DBName = env.GetString("DBName", "auth_dev")

	fmt.Println("Connecting to database", cfg.DBName, cfg.FormatDSN())
	// cfg.FormatDSN() is used to format the DSN (Data Source Name) string for connecting to the database
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		fmt.Println("Error connecting to databse", err)
		return nil, err
	}
	fmt.Println("Trying to Connect to database")
	pingErr := db.Ping()
	if pingErr != nil {
		fmt.Println("Error pinging database", pingErr)
		return nil, pingErr
	}
	fmt.Println("Connected to database successfully", cfg.DBName)
	return db, nil
}

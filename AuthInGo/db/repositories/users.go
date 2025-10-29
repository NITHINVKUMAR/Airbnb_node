package db

import (
	// "database/sql"
	"fmt"
)

type UserRepository interface {
	Create() error
}

type UserRepositoryImpl struct {
	// This is DB instance, Provided by sql pacakage and can be used to performe SQL operations
	// db *sql.DB
}

func NewUserRepository() UserRepository {
	return &UserRepositoryImpl{
		// db: db,
	}
}

func (u *UserRepositoryImpl) Create() error {
	fmt.Println("Creating User in user repository")
	return nil
}

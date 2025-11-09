package services

import (
	db "AuthInGO/db/repositories"
	"AuthInGO/utils"
	"fmt"
)

type UserService interface {
	GetUserById() error
	CreateUser() error
	LoginUser() error
}

type UserServiceImpl struct {
	userRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
}

func (u *UserServiceImpl) GetUserById() error {
	fmt.Println("Creating user in UserService")
	u.userRepository.GetByID()
	return nil
}

func (u *UserServiceImpl) CreateUser() error {
	fmt.Println("Creating user in UserService")
	password := "example_password"
	hashedPassword, err := utils.HashedPassword(password)
	if err != nil {
		return err
	}
	u.userRepository.Create(
		"Username1_example",
		"user1@example.com",
		hashedPassword,
	)
	return nil
}

func (u *UserServiceImpl) LoginUser() error {
	response := utils.CheckPasswordHash("example_password_1", "$2a$10$cNsnZGYNXRAy4mN6.LkUpO4BLNl0Ns/NIYlQom7NVtaq1zCXaGuN6")
	fmt.Println("Login Response", response)
	return nil
}

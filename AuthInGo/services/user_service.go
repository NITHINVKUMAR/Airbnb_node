package services

import (
	env "AuthInGO/config/env"
	db "AuthInGO/db/repositories"
	"AuthInGO/utils"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
)

type UserService interface {
	GetUserById() error
	CreateUser() error
	LoginUser() (string, error)
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

func (u *UserServiceImpl) LoginUser() (string, error) {
	// response := utils.CheckPasswordHash("example_password", "$2a$10$cNsnZGYNXRAy4mN6.LkUpO4BLNl0Ns/NIYlQom7NVtaq1zCXaGuN6")
	// fmt.Println("Login Response", response)
	// return nil

	email := "user1@example.com"
	password := "example_password"
	user, err := u.userRepository.GetUserByEmail(email)
	if err != nil {
		fmt.Println("Error fetching user by email:", err)
		return "", err
	}
	if user == nil {
		fmt.Println("No user found with the given email")
		return "", fmt.Errorf("no user found with email", email)
	}
	isValid := utils.CheckPasswordHash(password, user.Password)
	if !isValid {
		fmt.Println("Invalid credentials")
		return "", nil
	}
	payload := jwt.MapClaims{
		"email": user.Email,
		"id":    user.Id,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	tokenString, err := token.SignedString([]byte(env.GetString("JWT_SECRET", "TOKEN")))
	if err != nil {
		fmt.Println("Error Signing Token", err)
		return "", err
	}
	fmt.Println("Generated Token:", tokenString)

	return tokenString, nil
}

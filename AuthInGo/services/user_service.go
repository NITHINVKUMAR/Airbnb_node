package services

import (
	db "AuthInGO/db/repositories"
	"fmt"
)

type UserService interface {
	GetUserById() error
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

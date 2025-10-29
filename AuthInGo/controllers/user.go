package controllers

import (
	"AuthInGO/services"
	"fmt"
	"net/http"
)

type UserContoller struct {
	UserService services.UserService
}

func NewUserContoller(_userService services.UserService) *UserContoller {
	return &UserContoller{
		UserService: _userService,
	}
}

func (uc *UserContoller) RegisterUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("RegisterUser called in UserConrtoller")
	uc.UserService.CreateUser()
	w.Write([]byte("User Registeration Endpoint"))
}

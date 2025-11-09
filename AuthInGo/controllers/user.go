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
	fmt.Println("GetUserById called in UserConrtoller")
	uc.UserService.GetUserById()
	w.Write([]byte("User fetching Endpoint"))
}

func (uc *UserContoller) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CreateUser called in UserConrtoller")
	uc.UserService.CreateUser()
	w.Write([]byte("User creation Endpoint done"))
}

func (uc *UserContoller) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("LoginUser called in UserConrtoller")
	uc.UserService.LoginUser()
	w.Write([]byte("User Loggin EndPoint done"))
}

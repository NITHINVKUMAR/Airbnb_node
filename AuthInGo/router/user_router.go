package router

import (
	"AuthInGO/controllers"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	userController *controllers.UserContoller
}

func NewUserRouter(_userController *controllers.UserContoller) Router {
	return &UserRouter{
		userController: _userController,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	r.Get("/users/profile", ur.userController.RegisterUser)
	r.Post("/users/signup", ur.userController.CreateUser)
	r.Post("/users/login", ur.userController.LoginUser)
}

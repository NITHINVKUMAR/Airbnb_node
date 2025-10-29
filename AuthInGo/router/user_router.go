package router

import (
	"AuthInGO/controllers"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	userContoller *controllers.UserContoller
}

func NewUserRouter(_userController *controllers.UserContoller) Router {
	return &UserRouter{
		userContoller: _userController,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	r.Post("/signup", ur.userContoller.RegisterUser)
}

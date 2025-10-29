package db

type Storage struct { // Facilitates dependency injection for repository
	UserRepository UserRepository
}

func NewStorgage() *Storage {
	return &Storage{
		UserRepository: &UserRepositoryImpl{},
	}
}

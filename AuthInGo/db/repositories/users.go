package db

import (
	"AuthInGO/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	GetByID() (*models.User, error)
	Create(username string, email string, hashedPassword string) error
	// GetAll() ([]*models.User, error)
	// DeleteByID(id int64) error
}

type UserRepositoryImpl struct {
	// This is DB instance, Provided by sql pacakage and can be used to performe SQL operations
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}

func (u *UserRepositoryImpl) Create(username string, email string, hashedPassword string) error {
	query := "INSERT INTO users (username,email,password) VALUES (?,?,?)"
	// if you are not returning any rows use Exec method
	result, err := u.db.Exec(query, username, email, hashedPassword)
	if err != nil {
		fmt.Println("Error inserting user:", err)
		return err
	}
	rowsAffected, errRow := result.RowsAffected()
	if errRow != nil {
		fmt.Println("Error fetching rows affected:", errRow)
		return errRow
	}
	if rowsAffected == 0 {
		fmt.Println("No rows were inserted")
		return nil
	}
	fmt.Println("User inserted successfully, Rows affected:", rowsAffected)
	return nil
}

func (u *UserRepositoryImpl) GetByID() (*models.User, error) {
	fmt.Println("Geting User in UserRepository")

	// Step 1: Prepare the SQL query
	query := "SELECT id,username,email,password,created_at,updated_at FROM users WHERE id = ?"
	// Step 2: Execute the query QueryRow will return a single row
	// if you expect multiple rows use Query method instead Query()
	row := u.db.QueryRow(query, 1) // Assuming we are fetching user with ID 1
	// Step 3: Process the result
	user := &models.User{}

	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, err
		}
		fmt.Println("Error scanning user row:", err)
		return nil, err
	}
	// Step 4:Print the user detailes
	fmt.Println("User fetched successfully:", user)
	return user, nil
}

MIGRATIONS_FOLDER=db/migrations
DB_URL=root:Welcome@1@tcp(127.0.0.1:3306)/auth_dev
# Create a new migration -> gmake migrate-create name = "create_users_table"

migrate-create:
	goose -dir $(MIGRATIONS_FOLDER) create $(name) sql

migrate-up:
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" up

migrate-down:
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" down
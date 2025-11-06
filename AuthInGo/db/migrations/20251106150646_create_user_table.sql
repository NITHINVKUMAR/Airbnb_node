-- +goose Up
-- +goose StatementBegin
create table users (
id SERIAL primary key,
username varchar(255) NOT NULL,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table users;
-- +goose StatementEnd

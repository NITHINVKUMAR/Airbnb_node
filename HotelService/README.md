1) Clone the project
git clone https://github.com/NITHINVKUMAR/Express-TypeScript-Starter.git <ProjectName>


2) Move in to the folder structure
cd <ProjectName>

3) Install npm dependencies
npm i

4) Create a new .env file in the root directory and add the PORT env variable

5) echo PORT=3000 >> .env

6) Start the express server

7) npm run dev


Model
A model defines the structure of a table in your database using code (e.g., fields like name, email, etc.).

 Migration
A migration is a script that creates or changes tables and columns in your database.

up: code to apply the changes (e.g., create a table).

down: code to revert the changes (e.g., drop the table).

Seeder
A seeder is a script that inserts sample or default data into the database.


install npm i sequelize which is an ORM (Object-Relational Mapping) library for Node.js that simplifies database interactions.
install npm i mysql2 which is a MySQL client for Node.js that allows your application to connect to and interact with MySQL databases.
install npm i --save-dev sequelize-cli which is a command-line interface tool for Sequelize that helps manage database migrations, models, and seeders.
Do npx sequelize-cli init inside Db folder of src It initializes the Sequelize project structure by creating necessary folders like config, models, migrations, and seeders.
models folder we write TS/JS code to define the structure of our database tables.
seeders folder in this folder we can write code to insert sample or default data into our database tables.
migration folder is used to create or modify database tables and columns.
create .sequelizerc file which tells Sequelize CLI where to find the config, models, migrations, and seeders folders.
Do npx sequelize-cli migration:generate --name <Name of the migration> to create a new migration file inside the migration folder.
Migration file contains two main functions: up and down.
up function is used to define the changes to be applied to the database
down function is used to revert the changes made by the up function.
TS is not supported in migration file so we have created sequelize.config.js file inside config folder require('ts-node/register'); this will automatically convert TS to JS when we run the migration command.
command to run the migration npx sequelize-cli db:migrate
command to undo the last migration npx sequelize-cli db:migrate:undo
command to undo all migrations npx sequelize-cli db:migrate:undo:all
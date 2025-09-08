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
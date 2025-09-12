install npm install prisma to download the prisma package

install npx prisma init inside src folder this will create a prisma folder with schema.prisma file in this file we will define our database schema and connection details 

install npx prisma migrate dev --name <migration_name> inside src folder to create the migration and push the schema to the database
if you want to update schema or add new models run npx prisma migrate dev --name <migration_name>

install npm i @prisma/client to download the prisma client it is a libraray provided by prisma to interact or query with the database

install npx prisma generate inside src folder this will automatically define the typescript types for our models   

Assignment
Implement pessimistic locking in createBooking function 
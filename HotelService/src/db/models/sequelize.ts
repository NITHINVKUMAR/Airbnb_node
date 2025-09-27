// This files is used to create a sequelize instance which will be used to connect to the database
import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/index";

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
    dialect: "mysql", // or 'postgres', 'sqlite', 'mariadb',
    host: dbConfig.DB_HOST,
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    logging:true, // This will log all the SQL queries to the console
});

export default sequelize;
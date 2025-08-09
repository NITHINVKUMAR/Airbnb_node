// This is the place where all the configration required to run the app server is defined
import dotenv from "dotenv";

type serverConfig = {
  PORT: number;
};

type DBConfig = {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
};

function loadEnv() {
  // This Loads all environmanet variables from .env to process
  dotenv.config();
}
loadEnv();
export const serverConfig: serverConfig = {
  PORT: Number(process.env.PORT) || 3001,
};

export const dbConfig: DBConfig = {
  DB_NAME: process.env.DB_NAME || "test_db", 
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_HOST: process.env.DB_HOST || "localhost",
};

console.log("Environment Valriables are loaded");

export default loadEnv;

// This is the place where all the configration required to run the app server is defined
import dotenv from "dotenv";

type serverConfig = {
  PORT: number;
  REDIS_HOST?: string;
  REDIS_PORT?: number;
};
function loadEnv() {
  // This Loads all environmanet variables from .env to process
  dotenv.config();
}
loadEnv();
export const serverConfig: serverConfig = {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
console.log("Environment Valriables are loaded");

export default loadEnv;

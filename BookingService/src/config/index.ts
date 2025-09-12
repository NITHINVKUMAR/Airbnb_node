// This is the place where all the configration required to run the app server is defined
import dotenv from "dotenv";

type serverConfig = {
  PORT: number,
  REDIS_SERVER_URL: string,
  LOCK_TTL: number
};
function loadEnv() {
  // This Loads all environmanet variables from .env to process
  dotenv.config();
}
loadEnv();
export const serverConfig: serverConfig = {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "localhost:6379",
  LOCK_TTL: Number(process.env.LOCK_TTL) || 5000, // time in ms
};
console.log("Environment Valriables are loaded");

export default loadEnv;

// This is the place where all the configration required to run the app server is defined
import dotenv from "dotenv";

type serverConfig = {
  PORT: number;
};
function loadEnv() {
  // This Loads all environmanet variables from .env to process
  dotenv.config();
}
loadEnv();
export const serverConfig: serverConfig = {
  PORT: Number(process.env.PORT) || 3001,
};
console.log("Environment Valriables are loaded");

export default loadEnv;

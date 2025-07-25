import express from "express";
import { serverConfig } from "./config";
import pingRouter from "./routes/ping.router";
const app = express();

app.use(pingRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running at https://localhost:${serverConfig.PORT}`);
});

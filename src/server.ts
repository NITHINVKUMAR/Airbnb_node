import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routes/v1/index.router";
import v2Router from "./routes/v2/index.router";
const app = express();

app.use('/api/v1',v1Router);
app.use('/api/v2',v2Router);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running at https://localhost:${serverConfig.PORT}`);
});

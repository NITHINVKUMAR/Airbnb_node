import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routes/v1/index.router";
import v2Router from "./routes/v2/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middlweare";
import sequelize from "./db/models/sequelize";
const app = express();

// Middleware to parse JSON requests so that only JSON bodies are processed from the request body
app.use(express.json());
// Middleware to parse Text requests so that only text bodies are processed from the request body
// app.use(express.text());

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1',v1Router);
app.use('/api/v2',v2Router);
// Adding Error Handling middleware
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async() => {
  logger.info(`Server is running at https://localhost:${serverConfig.PORT}`);
  await sequelize.authenticate(); // This will test the connection to the database
  logger.info("Database connection has been established successfully.");
});

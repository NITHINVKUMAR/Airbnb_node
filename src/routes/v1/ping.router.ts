import express from "express";
import { pingHandler } from "../../controllers/ping.controller";
import { validateReqBody } from "../../validators";
import { pingSchema } from "../../validators/ping.validator";
const pingRouter = express.Router();

pingRouter.get('/',validateReqBody(pingSchema),pingHandler);

export default pingRouter;
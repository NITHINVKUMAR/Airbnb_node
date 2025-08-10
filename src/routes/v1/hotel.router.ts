import express from "express";
import { createHotelHandler,getHotelByIdHandler } from "../../controllers/hotel.controller";
import { validateReqBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";
const hotelRouter = express.Router();

hotelRouter.post('/',validateReqBody(hotelSchema), createHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);

export default hotelRouter;
import express from "express";
import { createHotelHandler,getHotelByIdHandler,getAllHotelsHandler,softDeleteHotelHandler } from "../../controllers/hotel.controller";
import { validateReqBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";
const hotelRouter = express.Router();

hotelRouter.post('/',validateReqBody(hotelSchema), createHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.get('/', getAllHotelsHandler);
hotelRouter.delete('/:id', softDeleteHotelHandler);

export default hotelRouter;
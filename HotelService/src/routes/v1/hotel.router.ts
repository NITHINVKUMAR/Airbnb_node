import express from "express";
import { createHotelHandler,getHotelByIdHandler,getAllHotelsHandler,softDeleteHotelHandler,updateHotelHandler } from "../../controllers/hotel.controller";
import { validateReqBody } from "../../validators";
import { hotelSchema,updateHotelSchema } from "../../validators/hotel.validator";
const hotelRouter = express.Router();

hotelRouter.post('/',validateReqBody(hotelSchema), createHotelHandler);
hotelRouter.get('/:id', getHotelByIdHandler);
hotelRouter.get('/', getAllHotelsHandler);
hotelRouter.delete('/:id', softDeleteHotelHandler);
hotelRouter.patch('/:id',validateReqBody(updateHotelSchema), updateHotelHandler);

export default hotelRouter;
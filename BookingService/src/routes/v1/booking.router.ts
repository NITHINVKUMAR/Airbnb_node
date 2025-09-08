import express from 'express';
import { createBookingHandler, confirmBookingHandler } from '../../controllers/booking.contoller';
import { validateRequestBody } from "../../validators";
import { CreateBookingValidator } from '../../validators/booking.validator';

const bookingRouter = express.Router();

bookingRouter.post('/',validateRequestBody(CreateBookingValidator),createBookingHandler);
bookingRouter.post('/confirm/:idempotencyKey',confirmBookingHandler);

export default bookingRouter;
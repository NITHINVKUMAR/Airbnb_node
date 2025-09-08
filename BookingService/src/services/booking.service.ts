import {
  createBooking,
  createIdempotencyKey,
  confirmBooking,
  finalizeIdempotencyKey,
  getIdempotancyKey,
} from "../repositories/booking.repository";
import { generateIdempotancyKey } from "../utils/generateIdempotancyKey";
import { BadRequestError,NotFoundError } from "../utils/errors/app.error";
import { CreateBookingDTO } from "../dto/booking.dto";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  const booking = await createBooking({
    userId:createBookingDTO.userId,
    hotelId:createBookingDTO.hotelId,
    totalGuests:createBookingDTO.totalGuests,
    bookingAmount:createBookingDTO.bookingAmount,
  });
  const idempotencyKey = await generateIdempotancyKey();
  await createIdempotencyKey(idempotencyKey, booking.id);
  return { bookingId: booking.id, idempotencyKey: idempotencyKey };
}

export async function confirmBookingService(idempotencyKey: string) {
  const idempotancyKeyData = await getIdempotancyKey(idempotencyKey);
  if (!idempotancyKeyData) {
    throw new NotFoundError("Invalid idempotency key");
  }
  if (idempotancyKeyData.finalized) {
    throw new BadRequestError("Booking already finalized");
  }
  const booking = await confirmBooking(idempotancyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);
  return booking;
}

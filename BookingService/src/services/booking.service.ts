import {
  createBooking,
  createIdempotencyKey,
  confirmBooking,
  finalizeIdempotencyKey,
  getIdempotancyKeyWithLock,
} from "../repositories/booking.repository";
import { generateIdempotancyKey } from "../utils/generateIdempotancyKey";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors/app.error";
import { CreateBookingDTO } from "../dto/booking.dto";
import PrismaClient from "../prisma/client";
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  // To avoid multiple bookings for same hotel by different user at the same time we will use distributed locking
  // we will use redlock algorithm for distributed locking
  // we will use hotel id as resource for locking so that only one user can book the same hotel at the same time
  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `hotel:${createBookingDTO.hotelId}`;
  try {
    await redlock.acquire([bookingResource], ttl);
    const booking = await createBooking({
      userId: createBookingDTO.userId,
      hotelId: createBookingDTO.hotelId,
      totalGuests: createBookingDTO.totalGuests,
      bookingAmount: createBookingDTO.bookingAmount,
    });
    const idempotencyKey = await generateIdempotancyKey();
    await createIdempotencyKey(idempotencyKey, booking.id);
    return { bookingId: booking.id, idempotencyKey: idempotencyKey };
  } catch (error) {
    throw new InternalServerError("Failed to acquire lock");
  }
}

export async function confirmBookingService(idempotencyKey: string) {
  /* user can send two parallel request in single transaction so after reaching first it can do context switch complete 
  the second request and then come back to first request again it will do the same operation so concurrancy issue can 
  happen within single transaction so we need to wrap the complete operation in single transaction and has user will send 
  two or three reuest concurrently in this case pessimistic locking will help us to lock the row until the transaction is completed */
  return await PrismaClient.$transaction(async (tx) => {
    const idempotancyKeyData = await getIdempotancyKeyWithLock(
      tx,
      idempotencyKey
    );
    if (!idempotancyKeyData) {
      throw new NotFoundError("Invalid idempotency key");
    }
    if (idempotancyKeyData.finalized) {
      throw new BadRequestError("IdempotancyKey already finalized");
    }
    const booking = await confirmBooking(tx, idempotancyKeyData.bookingId);
    await finalizeIdempotencyKey(tx, idempotencyKey);
    return booking;
  });
}

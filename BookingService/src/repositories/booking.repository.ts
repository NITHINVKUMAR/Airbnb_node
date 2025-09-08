import { Prisma } from "@prisma/client";
import PrismaClient  from "../prisma/client";

// Prisma.BookingCreateInput will auto define the type for bookingInput so we don't need to define it manually or no need of DTO
// you need DTO when you are manupliating the data before sending it to DB
export async function createBooking(bookingInput:Prisma.BookingCreateInput) {
    const booking = await PrismaClient.booking.create({
        data: bookingInput
    });
    return booking;
}

export async function createIdempotencyKey(key:string,bookingId:number) {
    const idempotencyKey = await PrismaClient.idempotencyKey.create({
        data:{
            key,
            booking:{
                connect:{
                    id:bookingId
                } 
            }
        }
    });
    return idempotencyKey;
}

export async function getIdempotancyKey(key:string) {
    const idempotencyKey = await PrismaClient.idempotencyKey.findUnique({
        where:{
            key
        }
    });
    return idempotencyKey;
}

export async function getBookingById(bookingId:number) {
    const booking = await PrismaClient.booking.findUnique({
        where:{
            id:bookingId
        }
    });
    return booking;
}

export async function confirmBooking(bookingId:number) {
    const booking = await PrismaClient.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:"CONFIRMED"
        }
    });
    return booking;
}

export async function cancelBooking(bookingId:number) {
    const booking = await PrismaClient.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:"CANCELLED"
        }
    });
    return booking;
}

export async function finalizeIdempotencyKey(key:string) {
    const idempotencyKey = await PrismaClient.idempotencyKey.update({
        where:{
            key
        },
        data:{
            finalized:true
        }
    });
    return idempotencyKey;
}
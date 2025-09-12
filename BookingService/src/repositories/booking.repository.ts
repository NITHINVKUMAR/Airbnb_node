import { Prisma ,idempotencyKey} from "@prisma/client";
import PrismaClient  from "../prisma/client";
import {validate as isValidUUID} from 'uuid';
import { BadRequestError,NotFoundError } from "../utils/errors/app.error";
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
           idemkey:key,
            booking:{
                connect:{
                    id:bookingId
                } 
            }
        }
    });
    return idempotencyKey;
}

export async function  getIdempotancyKeyWithLock(tx:Prisma.TransactionClient,key:string) {
    if(!isValidUUID(key)){
        throw new BadRequestError("Invalid idempotency key format");
    }

    const idempotencyKey:Array<idempotencyKey> = await tx.$queryRaw(
        // Primsa.raw will take the string and convert to sql and gives to queryraw 
        Prisma.raw(`SELECT * FROM IdempotencyKey WHERE idemkey = '${key}' FOR UPDATE;`)
    )
 
    console.log("Idempotancy key with Lock",idempotencyKey);

    if(!idempotencyKey || idempotencyKey.length === 0){
        throw new NotFoundError("Invalid idempotency key");
    }
    return idempotencyKey[0];
}

export async function getBookingById(bookingId:number) {
    const booking = await PrismaClient.booking.findUnique({
        where:{
            id:bookingId
        }
    });
    return booking;
}

export async function confirmBooking(tx:Prisma.TransactionClient,bookingId:number) {
    const booking = await tx.booking.update({
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

export async function finalizeIdempotencyKey(tx:Prisma.TransactionClient, key:string) {
    const idempotencyKey = await tx.idempotencyKey.update({
        where:{
            idemkey:key
        },
        data:{
            finalized:true
        }
    });
    return idempotencyKey;
}
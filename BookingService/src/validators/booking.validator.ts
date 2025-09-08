import {z} from "zod";

export const CreateBookingValidator = z.object({
    userId: z.number({message:"userId must be a number"}),
    hotelId: z.number({message:"hotelId must be a number"}),
    totalGuests: z.number({message:"totalGuests must be present"}).min(1,{message:"totalGuests must be at least 1"}),
    bookingAmount: z.number({message:"bookingAmount must be a number"}).min(1,{message:"bookingAmount must be at least 1"}),
}); 
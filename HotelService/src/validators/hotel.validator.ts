import { z } from 'zod';
export const hotelSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    location: z.string().min(1, "Location is required"),
    rating: z.number().optional(),
    rating_count: z.number().optional()
});

export const updateHotelSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),      
    address: z.string().min(1, "Address is required").optional(),
    location: z.string().min(1, "Location is required").optional(),
    rating: z.number().optional(),                               
    rating_count: z.number().optional()                  
});
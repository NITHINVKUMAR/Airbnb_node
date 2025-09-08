import { z } from 'zod';
export const hotelSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    location: z.string().min(1, "Location is required"),
    rating: z.number().optional(),
    rating_count: z.number().optional()
});
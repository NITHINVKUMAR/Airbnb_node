import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { CreateHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

//this function is asynchronous and will always return a promise that resolves to a Hotel object.
export async function createHotel(hotelData: CreateHotelDTO){
    
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        rating_count: hotelData.rating_count
    })
    logger.info(`Hotel created with ID: ${hotel.id}`);
    return hotel; 
    
}
export async function getHotelById(hotelId: number){
    const hotel = await Hotel.findByPk(hotelId);
    if(!hotel){
        logger.error(`Hotel with ID ${hotelId} not found`);
        throw new NotFoundError(`Hotel with ID ${hotelId} not found`);
    }
    logger.info(`Hotel fetched with ID: ${hotel.id}`);
    return hotel;
}
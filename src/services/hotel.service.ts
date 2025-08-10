import { CreateHotelDTO } from "../dto/hotel.dto";
import {createHotel, getHotelById} from "../repositories/hotel.repository";

export async function createHotelService(hotelData: CreateHotelDTO){
    const hotel = await createHotel(hotelData);
    return hotel;
}
export async function getHotelByIdService(hotelId: number){
    const hotel = await getHotelById(hotelId);
    return hotel;
}

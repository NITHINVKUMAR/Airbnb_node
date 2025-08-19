import { CreateHotelDTO } from "../dto/hotel.dto";
import {createHotel, getHotelById,getAllHotels,softDeleteHotel} from "../repositories/hotel.repository";

export async function createHotelService(hotelData: CreateHotelDTO){
    const hotel = await createHotel(hotelData);
    return hotel;
}
export async function getHotelByIdService(hotelId: number){
    const hotel = await getHotelById(hotelId);
    return hotel;
}
export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}
export async function softDeleteHotelService(hotelId: number) {
    const response = await softDeleteHotel(hotelId);
    return response;
}
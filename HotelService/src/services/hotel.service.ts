import { CreateHotelDTO } from "../dto/hotel.dto";
import {HotelRepository} from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: CreateHotelDTO){
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}
export async function getHotelByIdService(hotelId: number){
    const hotel = await hotelRepository.findById(hotelId);
    return hotel;
}
export async function getAllHotelsService() {
    const hotels = await hotelRepository.findAll();
    return hotels;
}
export async function softDeleteHotelService(hotelId: number) {
    const response = await hotelRepository.softDelete(hotelId);
    return response;
}
export async function updateHotelService(hotelId: number, updateData: Partial<CreateHotelDTO>) {
    const updatedHotel = await hotelRepository.update(hotelId, updateData);
    return updatedHotel;
}
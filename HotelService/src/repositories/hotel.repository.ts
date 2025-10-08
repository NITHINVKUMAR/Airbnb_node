import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { NotFoundError } from "../utils/errors/app.error";
import  BaseRepository  from "./base.repository";

// As base class is abstract we cannot create its instance menas we cannot
// add more functionality to it but we can extend it and add more functionality to the derived class
// As base class is abstarct we should not modify or override its methods in derived class
// so we extend the base class and add more functionality to it like soft delete and find all hotels which are not deleted
export class HotelRepository extends BaseRepository<Hotel> {
  constructor() {
    super(Hotel);
  }
  async findAll() {
    const hotels = await this.model.findAll({
      where: {
        deletedAt: null,
      },
    });
    if (!hotels) {
      logger.error("No hotels found");
      throw new NotFoundError("No hotels found");
    }
    return hotels;
  }
  async softDelete(id: number) {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      logger.error(`Hotel with ID ${id} not found for soft delete`);
      throw new NotFoundError(`Hotel with ID ${id} not found`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Hotel with ID ${id} soft deleted successfully`);
    return true;
  }
}
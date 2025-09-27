import { Request, Response, NextFunction } from "express";
import {createHotelService,getHotelByIdService,getAllHotelsService,softDeleteHotelService,updateHotelService} from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";
export const createHotelHandler = async (req: Request,res: Response,next: NextFunction) => {
    try{
    const hotelResponse = await createHotelService(req.body);

    res.status(StatusCodes.CREATED).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true,
    })
} catch (error) {
    next(error);
    }
};

export const getHotelByIdHandler = async (req: Request,res: Response,next: NextFunction) => {
    try{
    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    res.status(StatusCodes.OK).json({
        message: "Hotel found successfully",
        data: hotelResponse,
        success: true,
    })
} catch (error) {
    next(error);
    }
};

export const getAllHotelsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelsResponse = await getAllHotelsService();

        res.status(StatusCodes.OK).json({
            message: "Hotels fetched successfully",
            data: hotelsResponse,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const softDeleteHotelHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelResponse = await softDeleteHotelService(Number(req.params.id));

        res.status(StatusCodes.OK).json({
            message: "Hotel deleted successfully",
            data:hotelResponse,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const updateHotelHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelResponse = await updateHotelService(Number(req.params.id), req.body);

        res.status(StatusCodes.OK).json({
            message: "Hotel updated successfully",
            data:hotelResponse,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};
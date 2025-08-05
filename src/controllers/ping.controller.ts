import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";

export const pingHandler = async (req: Request, res: Response,next:NextFunction) => {
    // manually ading correlatio id
    // logger.info('Received ping request',{correlationId : req.headers['x-correlation-id']});
    logger.info('Received ping request');
    res.status(200).json({
    message:'pong',
    success:true,
    })
  
};

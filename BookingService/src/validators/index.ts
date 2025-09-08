import { Request,Response,NextFunction } from 'express';
import {ZodObject} from 'zod';
import logger from '../config/logger.config';
// schema --> zod schema to validate request body
// returns a middleware function that validates the request body against the schema 

export const validateRequestBody = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            logger.info('Received request body');
            await schema.parseAsync(req.body);
            logger.info('Request body is validated');
            next();
        }
        catch(err){
            res.status(400).json({
                message:'Invalid request body',
                success:false,
                error:err
            });
        }
    } 
}
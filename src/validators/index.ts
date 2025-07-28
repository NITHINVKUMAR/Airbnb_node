import { Request,Response,NextFunction } from 'express';
import {ZodObject} from 'zod';

// schema --> zod schema to validate request body
// returns a middleware function that validates the request body against the schema 

export const validateReqBody = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            await schema.parseAsync(req.body);
            console.log('request body is validated');
            next();
        }
        catch(err){
            return res.status(400).json({
                message:'Invalid request body',
                success:false,
                error:err
            });
        }
    } 
}
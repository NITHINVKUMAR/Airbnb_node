import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";
// Configure Winston logger
const logger = winston.createLogger({
    format:winston.format.combine(
        winston.format.timestamp(), // Add timestamp to log entries
        winston.format.json(), // Format logs as JSON 
        winston.format.printf(({timestamp,level,message, ...data})=>{
            const output  = {level,message,timestamp,correlationId:getCorrelationId(), data};
            return JSON.stringify(output);
        })
    ),
    transports : [
        new winston.transports.Console(), 
        // new winston.transports.File({filename:'logs/app.log'}),
        new DailyRotateFile({
            filename: 'logs/%DATE%-app.log', // Use date pattern for log files
            datePattern: 'YYYY-MM-DD', // Daily rotation
            maxSize: '20m', // Maximum size of each log file
            maxFiles: '14d' // Keep logs for 14 days
        })
    ]
})

export default logger;
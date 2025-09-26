// import { serverConfig } from "../config"
import { serverConfig } from "../config";
import logger from "../config/logger.config";
import transporter from "../config/mailer.config"
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
    try{
        transporter.sendMail({
        from: serverConfig.MAIL_USER,
        to,
        subject,
        html: body
        })
        logger.info(`Email sent to ${to} with subject ${subject}`);
    }
    catch(error){
        throw new InternalServerError('Error in sending email');
    }
}
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { InternalServerError } from '../utils/errors/app.error';

export async function renderMailTemplate(templateId:string,params:Record<string,any>): Promise<string> {
    const templatePath = path.join(__dirname,'mailer',`${templateId}.hbs`);
    try{
        const content = await fs.promises.readFile(templatePath,'utf-8');
        const template = handlebars.compile(content);
        return template(params);
    }
    catch(error){
        throw new InternalServerError(`Template ${templateId} not found`);
    }
}
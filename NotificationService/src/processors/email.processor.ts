import { Job, Worker } from "bullmq";
import { NotificationDTO } from "../dto/noticifaction.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/templates.handle";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setUpMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDTO>( // where <NotificationDTO> is generic class of type notificationDto for job data
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name !== MAILER_PAYLOAD) {
        console.log("Invalid Job");
      }
      const payload = job.data;
      console.log(`Processing email job: ${JSON.stringify(payload)}`);
      const emailContent = await renderMailTemplate(payload.templateId,payload.params);
      await sendEmail(payload.to,payload.subject,emailContent);
      logger.info(`Email sent to ${payload.to} with subject ${payload.subject}`);
    },
    {
      connection: getRedisConObject(),
    }
  );

  emailProcessor.on("failed", () => {
    console.log("Email Processing Failed");
  });

  emailProcessor.on("completed", () => {
    console.log("Email processing completed Successfully");
  });
};

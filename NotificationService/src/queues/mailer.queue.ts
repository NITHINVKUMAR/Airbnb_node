import { Queue } from "bullmq";
import { getRedisConObject } from "../config/redis.config";

export const MAILER_QUEUE = "queue-mailer";

export const mailerQueue = new Queue(MAILER_QUEUE, {
  connection: getRedisConObject(),
});
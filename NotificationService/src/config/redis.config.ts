import Redis from "ioredis";
import { serverConfig } from ".";


// Singleton Pattern to create only one instance of redis connection 
function connectToRedis() {
  try {
    let connection: Redis;

    const redisClient = {
      host: serverConfig.REDIS_HOST,
      port: serverConfig.REDIS_PORT,
      maxRetriesPerRequest: null,
    }; 

    return () => {
      if (!connection) {
        connection = new Redis(redisClient);
        return connection;
      }
      return connection;
    };
  } catch (error) {
    console.log("Error in connecting to redis server", error);
    throw error;
  }
}

export const getRedisConObject = connectToRedis(); 

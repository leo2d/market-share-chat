import * as dotenv from 'dotenv';

import DbConfig from '../constants/types/dbConfig';
import AuthConfig from '../constants/types/authConfig';
import RabbitMQConfig from '../constants/types/rabbitMQConfig';

const getPath = () => {
  switch (process.env.NODE_ENV) {
    case 'stage':
      return `${__dirname}/env.stage`;
    case 'production':
      return `${__dirname}/.env.prod`;
    case 'test':
      return `${__dirname}/.env.test`;
    default:
      return `${__dirname}/.env.dev`;
  }
};

const path = getPath();

dotenv.config({ path });

//variables
export const SERVER_PORT = process.env.SERVER_PORT;
export const BOT_API_ADDRESS = process.env.BOT_API_ADDRESS;

export const DATABASE_CONFIG: DbConfig = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  port: parseInt(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
};

export const RABBIT_MQ_CONFIG: RabbitMQConfig = {
  hostname: process.env.RABBITMQ_HOSTNAME,
  port: parseInt(process.env.RABBITMQ_PORT),
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  vhost: process.env.RABBITMQ_VHOST,
  heartbeat: parseInt(process.env.RABBITMQ_HEARTBEAT),

  quoteQueue: process.env.RABBITMQ_QUOTES_QUEUE,
  preFetchAmount: parseInt(process.env.RABBITMQ_PER_FETCH),
};

export const AUTH_CONFIG: AuthConfig = {
  expiresIn: process.env.AUTH_EXPIRES_IN,
  scretKey: process.env.AUTH_SECRET_KEY,
};

import * as dotenv from 'dotenv';

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

export const STOOQ_API_BASE_URL = process.env.STOOQ_API_BASE_URL;

export const RABBIT_MQ_CONFIG: RabbitMQConfig = {
  hostname: process.env.RABBITMQ_HOSTNAME,
  port: parseInt(process.env.RABBITMQ_PORT),
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  vhost: process.env.RABBITMQ_VHOST,
  heartbeat: parseInt(process.env.RABBITMQ_HEARTBEAT),

  quoteQueue: process.env.RABBITMQ_QUOTES_QUEUE,
};

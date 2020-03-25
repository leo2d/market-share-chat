import RabbitMQConfig from '../../constants/types/rabbitMQConfig';

const rabbitMQConfig: RabbitMQConfig = {
  hostname: 'localhost',
  port: 5672,
  username: 'rabbitmq',
  password: 'rabbitmq',
  vhost: '/',
  heartbeat: 60,

  quoteQueue: 'proccessedSotckCodes',
};

export default rabbitMQConfig;

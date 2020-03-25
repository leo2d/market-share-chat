export default interface RabbitMQConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
  heartbeat: number;

  quoteQueue: string;
}

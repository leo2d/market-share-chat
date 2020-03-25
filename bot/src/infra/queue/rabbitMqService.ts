import { injectable } from 'inversify';
import * as rabbit from 'amqplib';

import ProccessMessageDTO from '../../domain/quote/dtos/proccessMessageDTO';
import RabbitMQConfig from '../../constants/types/rabbitMQConfig';
import rabbitMQConfig from '../../config/queue/queueConfig';

@injectable()
export default class RabbitMQService {
  private rabbitConnection: rabbit.Connection;
  private readonly quotesQueue: string;

  constructor() {
    this.quotesQueue = rabbitMQConfig.quoteQueue;
    this.start(rabbitMQConfig);
  }

  private async start(rabbitConfig: RabbitMQConfig) {
    const options: rabbit.Options.Connect = { ...rabbitConfig };

    this.rabbitConnection = await rabbit.connect(options);
  }

  async addMessage(queueMessage: ProccessMessageDTO): Promise<boolean> {
    try {
      const channel = await this.rabbitConnection.createChannel();
      if (channel) {
        await this.ensureQueue(channel);

        const content = new Buffer(JSON.stringify(queueMessage), 'utf-8');

        const success = channel.sendToQueue(this.quotesQueue, content, {
          persistent: true,
        });

        await channel.close();

        return success;
      }
    } catch (error) {
      console.log(
        `error on add the follow message to queue ' ${this.quotesQueue} ':  `,
        queueMessage
      );
      console.log(`error: `, error);
    }
  }

  private async ensureQueue(channel: rabbit.Channel): Promise<void> {
    const queueInfo = await channel.assertQueue(this.quotesQueue, {
      durable: true,
    });

    if (!queueInfo || !queueInfo.queue || queueInfo.queue === '')
      throw new Error(`Could not ensure queue: ${this.quotesQueue}`);
  }
}

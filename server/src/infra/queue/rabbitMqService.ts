import { injectable } from 'inversify';
import * as rabbit from 'amqplib';

import ProccessMessageDTO from './proccessMessageDTO';
import RabbitMQConfig from '../../constants/types/rabbitMQConfig';
import { RABBIT_MQ_CONFIG } from '../../config/config';
import * as bufferUtils from '../../utils/bufferUtils';

@injectable()
export default class RabbitMQService {
  private rabbitConnection: rabbit.Connection;
  private readonly quotesQueue: string;
  private readonly preFetchAmount: number;

  constructor() {
    this.quotesQueue = RABBIT_MQ_CONFIG.quoteQueue;
    this.preFetchAmount = RABBIT_MQ_CONFIG.preFetchAmount;
  }

  private async start(rabbitConfig: RabbitMQConfig) {
    if (!this.rabbitConnection) {
      const options: rabbit.Options.Connect = { ...rabbitConfig };

      this.rabbitConnection = await rabbit.connect(options);

      this.rabbitConnection.on('close', err => {
        console.log('RabbitMQ: Connection Closed');
      });

      this.rabbitConnection.on('error', err => {
        console.log('RabbitMQ: Connection Error: ', err);
      });
    }
  }

  private async createChannel(): Promise<rabbit.Channel> {
    const channel = await this.rabbitConnection.createChannel();
    channel.prefetch(this.preFetchAmount);

    return channel;
  }

  private async ensureQueue(channel: rabbit.Channel): Promise<void> {
    try {
      const queueInfo = await channel.assertQueue(this.quotesQueue, {
        durable: true,
      });

      if (!queueInfo || !queueInfo.queue || queueInfo.queue === '')
        throw new Error(`Could not ensure queue: ${this.quotesQueue}`);
    } catch (error) {
      await channel.close();
      throw error;
    }
  }

  public async listenForMessages(
    onMessageAction: (message: ProccessMessageDTO) => any
  ): Promise<void> {
    try {
      await this.start(RABBIT_MQ_CONFIG);

      const channel = await this.createChannel();
      await this.ensureQueue(channel);

      console.log(
        `RabbitMQ: litenning messages from queue ${this.quotesQueue}`
      );

      await channel.consume(this.quotesQueue, async msg => {
        if (msg && msg.content) {
          channel.ack(msg);

          const proccessedMsg = bufferUtils.parseBufferToMessage(msg.content);

          onMessageAction(proccessedMsg);
        } else {
          channel.nack(msg);
        }
      });
    } catch (error) {
      console.log(
        `RabbitMQ: error on listen messages from queue ' ${this.quotesQueue} ':  `,
        error
      );
    }
  }
}

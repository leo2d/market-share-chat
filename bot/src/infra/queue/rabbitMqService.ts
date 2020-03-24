import { injectable } from 'inversify';

@injectable()
export default class RabbitMQService {
  async addMessage(queueMessage: { messageId: string; requestUserId: string; roomId: string; quoteMessage: string; }) {
    throw new Error("Method not implemented.");
  }
}

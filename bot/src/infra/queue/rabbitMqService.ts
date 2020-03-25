import { injectable } from 'inversify';
import ProccessMessageDTO from '../../domain/quote/dtos/proccessMessageDTO';

@injectable()
export default class RabbitMQService {
  async addMessage(queueMessage: ProccessMessageDTO): Promise<void> {
    try {
      console.log('adding on queue: ', queueMessage);
    } catch (error) {
      console.log('error on add to queue: ', error);
    }
  }
}

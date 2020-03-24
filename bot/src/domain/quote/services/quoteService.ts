import { injectable, inject } from 'inversify';
import StooqService from '../../../infra/http/stooqService';
import InjectTYPES from '../../../constants/types/injectTypes';
import RabbitMQService from '../../../infra/queue/rabbitMqService';

@injectable()
export default class QuoteService {
  private readonly stooqService: StooqService;
  private readonly queueService: RabbitMQService;

  constructor(
    @inject(InjectTYPES.services.StooqService)
    stooqService: StooqService,
    @inject(InjectTYPES.services.StooqService)
    rabbitMQService: RabbitMQService
  ) {
    this.stooqService = stooqService;
    this.queueService = rabbitMQService;
  }

  async proccessStockCode(stockCode: string): Promise<void> {
    const dto = {
      requestUserId: '',
      roomId: '',
      stockCode: '',
    };

    const quote = await this.stooqService.getStockInfoByCode(stockCode);

    const stockQuoteMessage = quote.buildStockQuoteMessage();

    const queueMessage = {
      messageId: '',
      requestUserId: '',
      roomId: '',
      quoteMessage: stockQuoteMessage,
    };

    await this.queueService.addMessage(queueMessage);

    console.log('finalMessage: ', stockQuoteMessage);
  }
}

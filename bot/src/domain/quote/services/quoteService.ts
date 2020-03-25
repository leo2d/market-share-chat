import { injectable, inject } from 'inversify';

import InjectTYPES from '../../../constants/types/injectTypes';
import StooqService from '../../../infra/http/stooqService';
import RabbitMQService from '../../../infra/queue/rabbitMqService';
import QuoteRequestDTO from '../dtos/quoteRequestDTO';
import ProccessMessageDTO from '../dtos/proccessMessageDTO';

@injectable()
export default class QuoteService {
  private readonly stooqService: StooqService;
  private readonly queueService: RabbitMQService;

  constructor(
    @inject(InjectTYPES.services.StooqService)
    stooqService: StooqService,
    @inject(InjectTYPES.services.RabbitMQService)
    rabbitMQService: RabbitMQService
  ) {
    this.stooqService = stooqService;
    this.queueService = rabbitMQService;
  }

  async proccessStockCode(quoteRequest: QuoteRequestDTO): Promise<void> {
    const quote = await this.stooqService.getStockInfoByCode(
      quoteRequest.stockCode
    );

    const queueMessage: ProccessMessageDTO = {
      roomId: quoteRequest.roomId,
      requestedStock: quoteRequest.stockCode,
      success: false,
      quote: 0,
    };

    if (quote) {
      queueMessage.success = true;
      queueMessage.quote = quote.Close;
    }

    await this.queueService.addMessage(queueMessage);
  }
}

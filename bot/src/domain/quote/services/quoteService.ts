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

    const errorMessage = `Error: We could not find information for stock code "${quoteRequest.stockCode}".`;

    const queueMessage: ProccessMessageDTO = {
      roomId: quoteRequest.roomId,
      success: false,
      message: errorMessage,
    };

    if (quote) {
      queueMessage.success = true;
      queueMessage.message = quote.buildStockQuoteMessage();
    }

    await this.queueService.addMessage(queueMessage);
  }
}

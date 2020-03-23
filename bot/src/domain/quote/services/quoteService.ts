import { injectable, inject } from 'inversify';
import StooqService from '../../../infra/http/stooqService';
import InjectTYPES from '../../../constants/types/injectTypes';

@injectable()
export default class QuoteService {
  private readonly stooqService: StooqService;

  constructor(
    @inject(InjectTYPES.services.StooqService)
    stooqService: StooqService
  ) {
    this.stooqService = stooqService;
  }

  async proccessStockCode(stockCode: string): Promise<void> {
    const csv = await this.stooqService.getCsvByStockCode(stockCode);
    
  }
}

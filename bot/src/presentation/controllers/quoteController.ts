import {
  controller,
  httpGet,
  response,
  queryParam,
  interfaces,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Response } from 'express';
import QuoteService from '../../domain/quote/services/quoteService';
import InjectTYPES from '../../constants/types/injectTypes';

@controller('/stock')
export default class QuoteController implements interfaces.Controller {
  private readonly quoteService: QuoteService;

  constructor(
    @inject(InjectTYPES.services.QuoteService)
    quoteService: QuoteService
  ) {
    this.quoteService = quoteService;
  }

  @httpGet('/')
  async proccessCode(
    @queryParam('stock') stock: string,
    @response() res: Response
  ): Promise<void> {
    {
      if (!stock || stock.trim() === '') {
        res.status(400);
      } else {
        this.quoteService.proccessStockCode(stock);
        res.status(202);
      }
    }
  }
}

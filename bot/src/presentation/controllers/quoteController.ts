import {
  controller,
  response,
  requestBody,
  interfaces,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Response } from 'express';

import InjectTYPES from '../../constants/types/injectTypes';
import QuoteService from '../../domain/quote/services/quoteService';
import QuoteRequestDTO from '../../domain/quote/dtos/quoteRequestDTO';

@controller('/quotes')
export default class QuoteController implements interfaces.Controller {
  private readonly quoteService: QuoteService;

  constructor(
    @inject(InjectTYPES.services.QuoteService)
    quoteService: QuoteService
  ) {
    this.quoteService = quoteService;
  }

  @httpPost('/')
  async proccessCode(
    @requestBody() quoteRequest: QuoteRequestDTO,
    @response() res: Response
  ): Promise<void> {
    {
      if (!quoteRequest || quoteRequest.stockCode.trim() === '') {
        res.status(400);
      } else {
        //Missing "await" here is intentional.
        //The client does not have to wait for this.
        this.quoteService.proccessStockCode(quoteRequest);
        res.status(204);
      }
    }
  }
}

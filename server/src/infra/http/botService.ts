import { injectable, inject } from 'inversify';
import { AxiosInstance } from 'axios';

import InjectTYPES from '../../constants/types/injectTypes';
import QuoteRequestDTO from './quoteRequestDTO';
import { BOT_API_ADDRESS } from '../../config/config';

@injectable()
export default class BotService {
  private readonly httpClient: AxiosInstance;

  constructor(@inject(InjectTYPES.Axios.AxiosInstance) axios: AxiosInstance) {
    this.httpClient = axios;
  }

  async sendToBot(quoteRequest: QuoteRequestDTO): Promise<boolean> {
    const response = await this.httpClient
      .post(`${BOT_API_ADDRESS}quotes`, quoteRequest)
      .catch(error => {
        if (error?.response?.status >= 400) {
          console.log('error when send to bot: ', error);
          return false;
        } else return error;
      });

    return response && response.status === 204;
  }
}

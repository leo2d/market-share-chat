import { injectable, inject } from 'inversify';
import { AxiosInstance } from 'axios';
import InjectTYPES from '../../constants/types/injectTypes';
import { getStooqEndPoint } from '../../config/externals/endpoints';

@injectable()
export default class StooqService {
  private readonly httpClient: AxiosInstance;

  constructor(@inject(InjectTYPES.Axios.AxiosInstance) axios: AxiosInstance) {
    this.httpClient = axios;
  }

  async getCsvByStockCode(stockCode: string): Promise<any> {
    try {
      console.log('stock: ', stockCode);
      const url = getStooqEndPoint(stockCode);
      console.log('url: ', url);
      const response = await this.httpClient.get(url);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

import { injectable, inject } from 'inversify';
import { AxiosInstance } from 'axios';
import InjectTYPES from '../../constants/types/injectTypes';
import { getStooqEndPoint } from '../../config/externals/endpoints';
import * as CsvUtils from '../../utils/csvUtils';
import Quote from '../../domain/quote/quote';

@injectable()
export default class StooqService {
  private readonly httpClient: AxiosInstance;

  constructor(@inject(InjectTYPES.Axios.AxiosInstance) axios: AxiosInstance) {
    this.httpClient = axios;
  }

  private async getCsvByStockCode(stockCode: string): Promise<any> {
    try {
      const url = getStooqEndPoint(stockCode);
      const response = await this.httpClient.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getStockInfoByCode(sotckCode: string): Promise<Quote> {
    const csvContent = await this.getCsvByStockCode(sotckCode);

    if (!CsvUtils.isCSVstringValid(csvContent)) return null;

    return await CsvUtils.parseCSVStringToQuote(csvContent);
  }
}

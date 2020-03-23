import { Container, AsyncContainerModule } from 'inversify';
import axios, { AxiosInstance } from 'axios';

import InjectTYPES from '../../constants/types/injectTypes';
import StooqService from '../http/stooqService';
import RabbitMQService from '../queue/rabbitMqService';
import QuoteService from '../../domain/quote/services/quoteService';

const bindings = new AsyncContainerModule(async bind => {
  bind<StooqService>(InjectTYPES.services.StooqService)
    .to(StooqService)
    .inRequestScope();

  bind<RabbitMQService>(InjectTYPES.services.RabbitMQService)
    .to(RabbitMQService)
    .inRequestScope();

  bind<QuoteService>(InjectTYPES.services.QuoteService)
    .to(QuoteService)
    .inRequestScope();

  bind<AxiosInstance>(InjectTYPES.Axios.AxiosInstance).toConstantValue(axios);
});

const setupContainer = async (): Promise<Container> => {
  const newContainer = new Container();

  await newContainer.loadAsync(bindings);

  return newContainer;
};

export default setupContainer;

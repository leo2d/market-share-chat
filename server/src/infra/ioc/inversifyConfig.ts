import { Container, AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import axios, { AxiosInstance } from 'axios';

import InjectTYPES from '../../constants/types/injectTypes';
import { DATABASE_CONFIG } from '../../config/config';
import UserService from '../../domain/user/services/userService';
import User from '../../domain/user/user';

import { createDBConnection } from '../data/createDBConnection';
import { getUserRepository } from '../data/repositories/userRepository';
import BotService from '../http/botService';
import RabbitMQService from '../queue/rabbitMqService';

const bindings = new AsyncContainerModule(async bind => {
  await createDBConnection(DATABASE_CONFIG);

  bind<AxiosInstance>(InjectTYPES.Axios.AxiosInstance).toConstantValue(axios);

  bind<Repository<User>>(InjectTYPES.repositories.UserRepository)
    .toDynamicValue(() => {
      return getUserRepository();
    })
    .inRequestScope();

  bind<UserService>(InjectTYPES.services.UserService)
    .to(UserService)
    .inRequestScope();

  bind<BotService>(InjectTYPES.services.BotService)
    .to(BotService)
    .inTransientScope();

  bind<RabbitMQService>(InjectTYPES.services.RabbitMQService)
    .to(RabbitMQService)
    .inTransientScope();
});

const setupContainer = async (): Promise<Container> => {
  const newContainer = new Container();

  await newContainer.loadAsync(bindings);

  return newContainer;
};

export default setupContainer;

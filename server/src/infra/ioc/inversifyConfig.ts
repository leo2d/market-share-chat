import { Container, AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import axios, { AxiosInstance } from 'axios';

import InjectTYPES from '../../constants/types/injectTypes';
import { connectionConfig } from '../../config/db/dbConfig';
import UserService from '../../domain/user/services/userService';
import User from '../../domain/user/user';

import { getDbConnection } from '../data/getConnection';
import { getUserRepository } from '../data/repositories/userRepository';
import BotService from '../http/botService';

const bindings = new AsyncContainerModule(async bind => {
  await getDbConnection(connectionConfig);

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
});

const setupContainer = async (): Promise<Container> => {
  const newContainer = new Container();

  await newContainer.loadAsync(bindings);

  return newContainer;
};

export default setupContainer;

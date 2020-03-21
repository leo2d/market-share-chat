import { Container, AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import InjectTYPES from '../../constants/types/injectTypes';
import { connectionConfig } from '../../config/db/dbConfig';
import UserService from '../../domain/user/services/userService';
import User from '../../domain/user/user';

import { getDbConnection } from '../data/getConnection';
import { getUserRepository } from '../data/repositories/userRepository';

const bindings = new AsyncContainerModule(async bind => {
  await getDbConnection(connectionConfig);

  bind<UserService>(InjectTYPES.services.UserService)
    .to(UserService)
    .inRequestScope();

  bind<Repository<User>>(InjectTYPES.repositories.UserRepository)
    .toDynamicValue(() => {
      return getUserRepository();
    })
    .inRequestScope();
});

const setupContainer = async (): Promise<Container> => {
  const newContainer = new Container();

  await newContainer.loadAsync(bindings);

  return newContainer;
};

export default setupContainer;
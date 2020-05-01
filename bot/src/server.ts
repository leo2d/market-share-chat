import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import setupContainer from './infra/ioc/inversifyConfig';
import { SERVER_PORT } from './config/config';

import './presentation/controllers';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
  const container = await setupContainer();
  const server = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  server.setConfig(app => {
    app.use(express.json());
  });

  const app = server.build();

  app.listen(SERVER_PORT);

  console.log(`Bot is running at http://127.0.0.1:${SERVER_PORT}/`);
})();

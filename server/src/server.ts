import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';

import setupContainer from './infra/ioc/inversifyConfig';
import './presentation/controllers';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
  const container = await setupContainer();
  const app = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  const corsOptions = {
    exposedHeaders: ['access-token'],
  };

  app.setConfig(app => {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(express.json());
  });

  const server = app.build();

  const port = 3300;
  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();

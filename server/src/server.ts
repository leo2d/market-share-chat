import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import SocketIO from 'socket.io';
import { InversifyExpressServer } from 'inversify-express-utils';

import setupContainer from './infra/ioc/inversifyConfig';
import './presentation/controllers';
import SocketManager from './infra/socket/socketManager';
import { port } from './config/serverConfig';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
  const container = await setupContainer();
  const server = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  const corsOptions = {
    exposedHeaders: ['access-token'],
  };

  server.setConfig(app => {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(express.json());
  });

  const app = server.build();

  const serverInstance = app.listen(port);

  const socketIOServer = SocketIO(serverInstance);

  SocketManager.manageServerEvents(socketIOServer);

  console.log(`Server running at http://127.0.0.1:${port}/`);
})();

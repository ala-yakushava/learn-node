import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { logger } from './utils/logger';
import { logRequests, logErrors, errorHandler } from './utils/middleware';
import { verify, passport, localAuth, jwtAuth } from './utils/passport';
import router from './routes';
import { port } from './config';
import { close } from './db';

export const start = () => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(logRequests);
  server.use(passport.initialize());
  server.use(passport.session());
  server.post('/login', localAuth);
  server.use('/', verify, jwtAuth, router);
  server.use(logErrors);
  server.use(errorHandler);

  server.listen(port, () => {
    logger.info(`Server has been started on ${port}.`);
  });
};

process.on('unhandledRejection', async (err) => {
  logger.error('App crashed and will be closed:', err);
  await close();
  process.exit(1);
});

import express from 'express';
import 'express-async-errors';

import logger from './utils/logger';
import { logRequests, logErrors, errorHandler } from './utils/middleware';
import router from './routes';
import { port } from './config';
import { close } from './db';

export const start = () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(logRequests);
  server.use('/', router);
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

import express from 'express';

import { setupRoutes } from './routes';
import { port } from './config';

export const start = () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  setupRoutes(server);

  server.listen(port, () => {
    console.log(`Server has been started on ${port}`);
  });
};

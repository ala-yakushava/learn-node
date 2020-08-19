import express from 'express';

import { addRouters } from './controllers';
import { port } from './config';

export const start = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  addRouters(app);

  app.listen(port, () => {
    console.log(`Server has been started on ${port}`);
  });
};

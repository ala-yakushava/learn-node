import { logger } from './utils/logger';
import { connect, sync } from './db';
import { start } from './server';

export default () => {
  connect()
    .then(sync)
    .then(start)
    .catch(err => logger.error(err));
};

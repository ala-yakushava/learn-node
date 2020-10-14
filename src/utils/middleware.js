import logger from './logger';

export const logRequests = (req, _res, next) => {
  const { method, url, query, body } = req;
  logger.info('Request: { method: %s, url: %s, query: %s, body: %s }', method, url, query, body);
  next();
};

export const logErrors = (err, req, _res, next) => {
  const { method, url, query, body } = req;
  logger.error('Request: { method: %s, url: %s, query: %s, body: %s } has been failed with %s', method, url, query, body, err);
  next(err);
};

export const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = 'Something broke!';
  }

  res.status(err.statusCode).send(err.message);
};

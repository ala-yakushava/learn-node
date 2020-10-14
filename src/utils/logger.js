import { createLogger, format, transports } from 'winston';

const { combine, timestamp, splat, json, colorize, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    splat(),
    json(),
  ),
  transports: [
    new transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
    new transports.File({ dirname: 'logs', filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      simple(),
    )
  }));
}

export default logger;

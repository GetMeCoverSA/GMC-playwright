import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Change to 'debug' for more detailed logs
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/test.log' })
  ]
});

export { logger };
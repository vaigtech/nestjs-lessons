import { createLogger, format, transports, addColors } from 'winston';
require('newrelic');
// Define custom logging levels and colors
const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

// Apply colors to the custom levels
addColors(customLevels.colors);

// Custom log display format
const customFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack, ...meta }) => {
    return `${timestamp} [${level}]: ${stack || message}${
      Object.keys(meta).length ? ` ${JSON.stringify(meta, null, 2)}` : ''
    }`;
  }),
);

// Transport options
const options = {
  file: {
    filename: 'logger/error.log',
    level: 'error',
  },
  console: {
    format: customFormat,
    level: 'trace',
  },
};

// Development Logger Configuration
const devLogger = {
  levels: customLevels.levels,
  format: customFormat,
  transports: [new transports.Console(options.console)],
};

// Production Logger Configuration
const prodLogger = {
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'logger/combine.log',
      level: 'info',
    }),
  ],
};

// Export the logger instance based on the environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const loggerInstance = createLogger(instanceLogger);

// Add custom logging methods for each log level
export const logger = {
  trace: (msg, meta) => loggerInstance.log('trace', msg, meta),
  debug: (msg, meta) => loggerInstance.debug(msg, meta),
  info: (msg, meta) => loggerInstance.info(msg, meta),
  warn: (msg, meta) => loggerInstance.warn(msg, meta),
  error: (msg, meta) => loggerInstance.error(msg, meta),
  fatal: (msg, meta) => loggerInstance.log('fatal', msg, meta),
};

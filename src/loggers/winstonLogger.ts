import winston from 'winston'
import { envVariables } from '../config/envVariables.js'
import { connectToDb } from '../config/mongodb.js'

const db = connectToDb()

export const winstonLogger = (collectionName?: string) => {
  const { combine, timestamp, json, printf, errors, prettyPrint, cli } =
    winston.format

  // Create logger and specify format for transports to use
  const logger = winston.createLogger({
    format: combine(errors({ stack: true }), timestamp(), json()),
  })

  // Log all errors to a separate collection in MongoDB
  logger.add(
    new winston.transports.MongoDB({
      db,
      level: envVariables.ERROR_LOG_LEVEL,
      collection: collectionName ?? 'error_logs',
      metaKey: 'meta',
      decolorize: true,
      options: {
        poolSize: 5,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    })
  )

  // Log to console in non-production environments
  if (envVariables.NODE_ENV !== 'production') {
    /**
     *  Custom format for console transport
     * @return Formatted log message
     */
    const customFormat = printf(({ level }) => {
      return `${level}`
    })

    // Log errors to the console
    logger.add(
      new winston.transports.Console({
        level: 'info',
        format: combine(cli(), customFormat),
      })
    )
    logger.add(
      new winston.transports.Console({
        level: 'info',
        format: combine(errors({ stack: true }), prettyPrint()),
      })
    )
    // Debug level logging
    logger.add(
      new winston.transports.Console({
        level: 'debug',
        format: cli(),
      })
    )
  }

  return logger
}

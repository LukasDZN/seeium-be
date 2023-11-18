import chalk from 'chalk'
import expressWinston from 'express-winston'
import mongoose from 'mongoose'
import winston from 'winston'
import 'winston-mongodb'
import { envVariables } from '../config/envVariables.js'

const { combine, timestamp, json, errors, cli } = winston.format

const LOGGER_MESSAGE = `${chalk
  .hex('#BF40BF')
  .bold('Response')}: {{res.statusCode}} {{res.responseTime}}ms`

/**
 * Default logging levels:
 * error: 0
 * warn: 1
 * info: 2
 * http: 3
 * verbose: 4
 * debug: 5
 * silly: 6
 */

/**
 * Middleware for logging all requests and responses to MongoDB
 *
 * @return Return an express-winston logger instance
 */
export const makeLogReqAndResMiddleware = () => {
  const dbConnection = mongoose.connection.getClient()
  // Promise is needed because the library expects a promise
  const dbConnectionPromise = Promise.resolve(dbConnection)

  // Create logger and specify format for transports to use
  const logger = winston.createLogger({
    format: combine(timestamp(), json(), errors({ stack: true })),
  })

  /**
   * Log all requests and responses to MongoDB.
   *
   * Error levels are set according to the HTTP status code:
   * HTTP 100-399: info
   * HTTP 400-499: warn
   * HTTP 500-599: error
   */
  logger.add(
    new winston.transports.MongoDB({
      db: dbConnectionPromise,
      level: envVariables.REQ_RES_LOG_LEVEL,
      collection: 'req_and_res_logs',
      metaKey: 'meta',
      decolorize: true,
      options: {
        poolSize: 5, // default. Default value 2
        autoReconnect: true, // default
        useNewUrlParser: true, // default
        useUnifiedTopology: true, // must be set to true to avoid deprecation warning
      },
    })
  )

  if (envVariables.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        level: 'debug',
        format: combine(cli()),
      })
    )
  }

  return expressWinston.logger({
    winstonInstance: logger,
    meta: true, // show request and response
    expressFormat: false,
    msg: LOGGER_MESSAGE,
    colorize: true,
    requestWhitelist: [
      // include these request properties in the log
      'ip',
      'url',
      'originalUrl',
      'headers',
      'method',
      'query',
      'params',
      'body',
    ],
    responseWhitelist: ['statusCode', 'headers', 'body'],
    // Different HTTP status codes will cause log messages
    // to be logged at different levels
    statusLevels: true,
    // Ignore these routes from req/res logging (but not error logging)
    ignoredRoutes: [
      '/api/healthCheck',
      '/docs/api.yaml',
      '/docs/renderedDocs.html',
      '/images/favicon.ico',
      '/0a6ad30060afff00cb34.worker.js.map',
    ],
  })
}

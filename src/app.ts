import chalk from 'chalk'
import express, { Application, NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import routeCache from 'route-cache'
import { envVariables } from './config/envVariables.js'
import { externalApis } from './infrastructure/api/externalApis.js'
import { logErrorsMiddleware } from './middleware/logErrors.middleware.js'
import { makeLogReqAndResMiddleware } from './middleware/logReqAndRes.middleware.js'
import { getPlaces } from './modules/places/features/getPlaces/getPlaces.router.js'
import { sharedConstants } from './modules/shared/constants/shared.constants.js'
import { ErrorResponseDto } from './modules/shared/types/ErrorResponseDto.type.js'
import { syncAirtableToMongoDb } from './scripts/airtable/syncAirtableToMongoDb.util.js'
import { generalLogger } from './server.js'

let isSyncAirtableToMongoDbRunning = false

export const makeApp = () => {
  const app: Application = express()

  // Middleware for POST/PUT requests
  app.use(express.urlencoded({ limit: '1mb', extended: true }))
  app.use(express.json({ limit: '1mb' }))
  app.disable('x-powered-by')
  // Set headers
  app.use((req, res, next) => {
    // Security headers (Enable CORS)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Max-Age', '86400') // ?test whether this works for caching POST pre-flight requests

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }

    next()
  })

  // Use compression (as advised in Express docs) -> note: handled by Render.com load balancer
  // Compression will be used with files over 1-1.5kb (default)
  // app.use(compression())

  if (envVariables.NODE_ENV !== 'production') {
    // Log requests to console
    app.use(
      morgan(
        `\n\n\n${chalk.green('info')}:    ${chalk
          .hex('#BF40BF')
          .bold('Request')}: :method :url`,
        {
          immediate: true, // Log request without waiting for response to be sent
        }
      )
    )
  }

  // Logging middleware - log all requests and responses
  // Note: logger must go before routes
  const logReqAndResMiddleware = makeLogReqAndResMiddleware()
  app.use(logReqAndResMiddleware)

  // Routes

  app.use(
    '/api/places',
    routeCache.cacheSeconds(
      sharedConstants.time.FIVE_MINUTES_IN_SECONDS,
      (req: Request) => {
        generalLogger.debug(
          '✅ Either caching initial response, or returning cached response for: ' +
            req.url
        )

        return req.originalUrl
      }
    ),
    getPlaces
  )

  app.get('/api/syncAirtable', async (req, res) => {
    try {
      if (isSyncAirtableToMongoDbRunning) {
        const errorResponseDto: ErrorResponseDto = {
          message: 'Sync already running. Please try again later.',
        }

        return res.status(StatusCodes.CONFLICT).json(errorResponseDto)
      }

      isSyncAirtableToMongoDbRunning = true

      const resultLog = await syncAirtableToMongoDb({
        syncTriggerSource: 'By hitting the /api/syncAirtable endpoint',
      })

      res.json(resultLog)
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      isSyncAirtableToMongoDbRunning = false
    }
  })

  app.get('/api/healthCheck', (req, res) => {
    res.json({
      status: 'success',
    })
  })

  app.use(express.static('src/public'))

  // Send a 404 error if no route is matched
  app.use((req: Request, res: Response) => {
    const errorResponseDto: ErrorResponseDto = {
      message: 'Route not found',
    }

    return res.status(StatusCodes.NOT_FOUND).send(errorResponseDto)
  })

  // Log errors
  // Note 1: errorLogger must go after routes.
  // Note 2: requests with invalid JSON will not be logged because they happen
  // in the express.json() middleware - before logger middleware
  app.use(logErrorsMiddleware)

  // Send slack alert
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (envVariables.APP_ENV !== 'production') {
      console.log(
        `🚀 Skipping sending Slack message in ${envVariables.APP_ENV} environment...}`
      )

      return next(error)
    }

    if (error instanceof Error) {
      externalApis.slackApiAdapter.sendMessage({
        message: `${error.message}`,
      })
    } else {
      externalApis.slackApiAdapter.sendMessage({
        message: 'Unknown error',
      })
    }

    return next(error)
  })

  // Error handler
  app.use(
    (
      error: unknown,
      req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => {
      const errorResponseDto: ErrorResponseDto = {
        message: 'Please try again later',
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(errorResponseDto)
    }
  )

  // Domain event listeners

  // Workers

  return app
}

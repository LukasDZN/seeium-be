import chalk from 'chalk'
import express, { Application, NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import { envVariables } from './config/envVariables.js'
import { makeWinstonLogger } from './loggers/makeWinston.logger.js'
import { logErrorsMiddleware } from './middleware/logErrors.middleware.js'
import { logReqAndResMiddleware } from './middleware/logReqAndRes.middleware.js'
import { router } from './modules/router.js'
import { ErrorResponseDto } from './modules/shared/types/ErrorResponseDto.type.js'

export const app: Application = express()

export const logger = makeWinstonLogger({ collectionName: 'error_logs' })
export const airtableLogger = makeWinstonLogger({ collectionName: 'airtable_logs' })
export const slackLogger = makeWinstonLogger({ collectionName: 'slack_logs' })

// Pretty print uncaught exceptions
process.on('uncaughtException', (error) => {
  console.log(chalk.red('Uncaught exception:'))
  console.log(error)
  process.exit(1)
})

// Pretty print unhandled rejections
process.on('unhandledRejection', (error) => {
  console.log(chalk.red('Unhandled rejection:'))
  console.log(error)
  process.exit(1)
})

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
app.use(logReqAndResMiddleware())

// Routes
app.use('/api', router)
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

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponseDto)
  }
)

// Domain event listeners

// Workers

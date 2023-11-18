import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../modules/shared/types/HttpRequest.js'
import { generalLogger } from '../server.js'

export const logErrorsMiddleware = (
  error: Error,
  req: Request,
  res: Response, // eslint-disable-line @typescript-eslint/no-unused-vars
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
  // next param is required for Express to recognize this as an error handler
) => {
  const requestLog = {
    // Note: or just ...request?
    request: {
      ip: req.ip,
      path: req.path,
      headers: {
        correlationId: req.get('uid') ?? '',
        'Content-Type': req.get('Content-Type') ?? '',
        Referer: req.get('Referer') ?? '',
        'User-Agent': req.get('User-Agent') ?? '',
        ...req.headers,
      },
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body,
    } satisfies HttpRequest,
  }

  if (error instanceof Error) {
    generalLogger.error({
      message: error.name,
      meta: {
        req: requestLog,
        error: {
          stack: error.stack,
          cause: error.cause,
        },
      },
    })
  } else {
    generalLogger.error({
      message: 'Unknown error',
      meta: {
        req: requestLog,
        error: error,
      },
    })
  }

  return next(error)
}

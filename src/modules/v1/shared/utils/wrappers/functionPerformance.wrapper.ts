import { winstonLogger } from '../../../../../loggers/winstonLogger.js'
import { sharedUtils } from '../shared.utils.js'

const logger = winstonLogger()

/**
 * A wrapper function to measure the performance of a function.
 *
 * @remarks
 * If a sync function is passed in, it will work, but become async.
 *
 * @example
 * const wrappedScrapingFunction = functionPerformanceWrapper(scrapingFunction)
 * const response = await wrappedScrapingFunction(req)
 *
 * @param fn - Function to measure
 * @returns Function that returns the same result as the original function, but also logs the performance
 */
export const functionPerformanceWrapper = <T extends Array<unknown>, U>(
  fn: (...args: T) => U
): ((...args: T) => Promise<U>) => {
  return async (...args: T): Promise<U> => {
    const startTime = performance.now()

    const functionResult = await fn(...args)

    const executionTimeInMilliseconds = performance.now() - startTime
    const executionTimeInSeconds = sharedUtils.millisecondsToSeconds(
      executionTimeInMilliseconds
    )
    const roundedExecutionTimeInSeconds = sharedUtils.roundFloat(
      executionTimeInSeconds,
      2
    )

    logger.debug(
      `Performance measurement: '${fn.name}' took ${roundedExecutionTimeInSeconds}s`
    )

    return functionResult
  }
}

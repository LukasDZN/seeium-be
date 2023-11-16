import { sharedUtils } from './shared.utils.js'

/**
 * Calls a given function at random intervals between specified
 * minimum and maximum amount of seconds.
 */
export const callFunctionAtRandomIntervals = (
  minSeconds: number,
  maxSeconds: number,
  fn: () => void
): void => {
  const minMilliseconds = minSeconds * 1000
  const maxMilliseconds = maxSeconds * 1000

  const randomDelayInMilliseconds = sharedUtils.getRandomIntFromRange(
    minMilliseconds,
    maxMilliseconds
  )

  setTimeout(() => {
    fn()
    sharedUtils.callFunctionAtRandomIntervals(minSeconds, maxSeconds, fn)
  }, randomDelayInMilliseconds)
}

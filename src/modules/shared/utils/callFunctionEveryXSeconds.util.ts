import { sharedUtils } from './shared.utils.js'

/**
 * Call a function every X amount of seconds.
 *
 * @remarks
 * Initial call is made after X amount of seconds.
 */
export const callFunctionEveryXSeconds = (
  seconds: number,
  fn: () => void
): void => {
  const interval = seconds * 1000

  setTimeout(() => {
    fn()
    sharedUtils.callFunctionEveryXSeconds(seconds, fn)
  }, interval)
}

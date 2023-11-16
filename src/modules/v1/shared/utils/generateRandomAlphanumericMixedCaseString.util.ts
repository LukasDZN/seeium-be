import { sharedConstants } from '../constants/shared.constants.js'
import { sharedUtils } from './shared.utils.js'

/**
 * Generate a random alphanumeric mixed case string of specified length.
 */
export const generateRandomAlphanumericMixedCaseString = (
  length: number
): string => {
  const charSet = sharedConstants.charSets.ALPHANUMERIC_MIXED_CASE_CHAR_SET

  return sharedUtils.generateRandomString(length, charSet)
}

import { sharedConstants } from '../constants/shared.constants.js'
import { sharedUtils } from './shared.utils.js'

/**
 * Generate a random alphanumeric lower case string of specified length.
 */
export const generateRandomAlphanumericLowerCaseString = (
  length: number
): string => {
  const charSet = sharedConstants.charSets.ALPHANUMERIC_LOWER_CASE_CHAR_SET

  return sharedUtils.generateRandomString(length, charSet)
}

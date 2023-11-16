import { sharedUtils } from './shared.utils.js'

export const generateRandomString = (length: number, charSet: string) => {
  const pattern = '*'.repeat(length)

  return sharedUtils.generateRandomStringByPattern(pattern, null, charSet)
}

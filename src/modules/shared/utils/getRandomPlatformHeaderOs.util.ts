import { sharedUtils } from './shared.utils.js'

/**
 * Select random device OS for Sec-CH-UA-Platform header.
 */
export const getRandomPlatformHeaderOs = (): string => {
  const osArray = [
    // 'Android',
    // 'iOS',
    'Chrome OS',
    'Chromium OS',
    'Linux',
    'macOS',
    'Windows',
  ]
  const randomIndex = sharedUtils.selectRandomIndex(osArray)

  const randomOs = osArray[randomIndex]

  if (!randomOs) {
    throw new Error('Random OS not found')
  }

  return randomOs
}

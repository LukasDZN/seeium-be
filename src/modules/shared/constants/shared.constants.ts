import { charSets } from './charSets.constant.js'
import { headers } from './headers.constant.js'
import { redisKeyPrefixes } from './redisKeyPrefixes.constant.js'
import { time } from './time.constant.js'

export const sharedConstants = {
  headers,
  charSets,
  time,
  redisKeyPrefixes,
} as const

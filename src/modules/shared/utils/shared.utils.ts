import { isAxiosError } from 'axios'
import { areCoordinatesWithinDistance } from './areCoordinatesWithinDistance.util.js'
import { calculateAverageFromNumberArray } from './calculateAverageFromNumberArray.util.js'
import { calculateWeightedAverage } from './calculateWeightedAverage.util.js'
import { callFunctionAtRandomIntervals } from './callFunctionAtRandomIntervals.util.js'
import { callFunctionEveryXSeconds } from './callFunctionEveryXSeconds.util.js'
import { cleanRegularString } from './cleanRegularString.util.js'
import { convertSymbolsToUnicode } from './convertSymbolsToUnicode.util.js'
import { coordinatesToMongoPoint } from './coordinatesToMongoPoint.util.js'
import { generateObjectId } from './generateObjectId.util.js'
import { generateObjectIdString } from './generateObjectIdString.util.js'
import { generateRandomAlphanumericLowerCaseString } from './generateRandomAlphanumericLowerCaseString.util.js'
import { generateRandomAlphanumericMixedCaseString } from './generateRandomAlphanumericMixedCaseString.util.js'
import { generateRandomString } from './generateRandomString.util.js'
import { generateRandomStringByPattern } from './generateRandomStringByPattern.util.js'
import { getHttpAgentTls1Point2 } from './getHttpAgentTls1Point2.util.js'
import { getRandomIntFromRange } from './getRandomIntFromRange.util.js'
import { getRandomPlatformHeaderOs } from './getRandomPlatformHeaderOs.util.js'
import { increaseIndexSensitivity } from './increaseIndexSensitivity.util.js'
import { invertIndex } from './invertIndex.util.js'
import { isDateOlderThanXDays } from './isDateOlderThanXDays.util.js'
import { keepOnlyWordsAndSpacesFromString } from './keepOnlyWordsAndSpacesFromString.util.js'
import { logMessageToFile } from './logMessageToFile.util.js'
import { mapAxiosErrorResponseToAxiosErrorLogWriteRecord } from './mapAxiosErrorToAxiosErrorLogDto.util.js'
import { mapToIndex } from './mapToIndex.util.js'
import { millisecondsToSeconds } from './millisecondsToSeconds.util.js'
import { mongoPointToCoordinates } from './mongoPointToCoordinates.util.js'
import { pickRandomCharacter } from './pickRandomCharacter.util.js'
import { removeUndefinedKeys } from './removeUndefinedKeys.util.js'
import { removeWordInstancesFromString } from './removeWordInstancesFromString.util.js'
import { removeWordsFromString } from './removeWordsFromString.util.js'
import { replaceMultipleWhiteSpacesWithSingle } from './replaceMultipleWhiteSpacesWithSingle.util.js'
import { roundFloat } from './roundFloat.util.js'
import { selectRandomIndex } from './selectRandomIndex.util.js'
import { sleep } from './sleep.util.js'
import { wasAxiosRequestRedirected } from './wasAxiosRequestRedirected.util.js'
import { sharedWrappers } from './wrappers/shared.wrappers.js'

export const sharedUtils = {
  convertSymbolsToUnicode,
  logMessageToFile,
  sharedWrappers,
  mapAxiosErrorResponseToAxiosErrorLogWriteRecord,
  mapToIndex,
  calculateAverageFromNumberArray,
  getHttpAgentTls1Point2,
  areCoordinatesWithinDistance,
  calculateWeightedAverage,
  callFunctionAtRandomIntervals,
  callFunctionEveryXSeconds,
  cleanRegularString,
  coordinatesToMongoPoint,
  generateObjectId,
  generateObjectIdString,
  generateRandomAlphanumericLowerCaseString,
  generateRandomAlphanumericMixedCaseString,
  generateRandomString,
  generateRandomStringByPattern,
  getRandomIntFromRange,
  getRandomPlatformHeaderOs,
  increaseIndexSensitivity,
  invertIndex,
  isAxiosError,
  isDateOlderThanXDays,
  keepOnlyWordsAndSpacesFromString,
  millisecondsToSeconds,
  mongoPointToCoordinates,
  pickRandomCharacter,
  removeUndefinedKeys,
  removeWordInstancesFromString,
  removeWordsFromString,
  replaceMultipleWhiteSpacesWithSingle,
  roundFloat,
  selectRandomIndex,
  sleep,
  wasAxiosRequestRedirected,
} as const

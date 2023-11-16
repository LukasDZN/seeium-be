import { savePlaceReadRecord } from './savePlaceReadRecord.js'
import { getPlaceReadRecordsByCoordinates } from './getPlaceReadRecordByCoordinates.js'

export const placesRepository = {
  getPlaceReadRecordsByCoordinates,
  savePlaceReadRecord,
} as const

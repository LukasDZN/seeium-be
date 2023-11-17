import { mapPlaceEntityToWriteRecord } from './mapPlaceEntityToWriteRecord.js'
import { mapReadRecordsToPlaceEntity } from './mapReadRecordToPlaceEntity.js'

export const placesMapper = {
  mapPlaceEntityToWriteRecord,
  mapReadRecordsToPlaceEntity,
} as const

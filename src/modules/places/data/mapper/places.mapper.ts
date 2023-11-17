import { mapPlaceEntityToWriteRecord } from './mapPlaceEntityToWriteRecord.js'
import { mapReadRecordToPlaceEntity } from './mapReadRecordToPlaceEntity.js'

export const placesMapper = {
  mapPlaceEntityToWriteRecord,
  mapReadRecordToPlaceEntity,
} as const

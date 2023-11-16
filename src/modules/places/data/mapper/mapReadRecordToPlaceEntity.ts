import { PlaceEntity, makePlaceEntity } from '../../entities/place.entity.js'
import { PlaceReadRecord } from '../recordTypes/placeReadRecord.type.js'

export const readRecordToPlaceEntity = ({
  placesReadRecord,
}: {
  placesReadRecord: PlaceReadRecord
}): PlaceEntity => {
  const makePlaceEntityInput = readRecordToMakePlaceEntityInput({
    placesReadRecord,
  })

  const placesEntity = makePlaceEntity({
    ...makePlaceEntityInput,
  })

  return placesEntity
}

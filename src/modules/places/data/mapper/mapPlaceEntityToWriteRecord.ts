import { PlaceEntity } from '#modules/places/entities/place.entity.js'
import { sharedUtils } from '#modules/shared/utils/shared.utils.js'
import { PlaceWriteRecord } from '../recordTypes/placeWriteRecord.type.js'

export const mapPlaceEntityToWriteRecord = ({
  placeEntity,
}: {
  placeEntity: PlaceEntity
}): PlaceWriteRecord => {
  const placeWriteRecord: PlaceWriteRecord = {
    _id: placeEntity.id,
    point: sharedUtils.coordinatesToMongoPoint({
      coordinates: placeEntity.coordinates,
    }),
    shortSummary: placeEntity.shortSummary,
    categories: placeEntity.categories,
    openingTime: placeEntity.openingTime,
    closingTime: placeEntity.closingTime,
    rating: placeEntity.rating,
    ticketPrice: placeEntity.ticketPrice,
    images: placeEntity.images,
    createdBy: placeEntity.createdBy,
    createdAt: placeEntity.createdAt,
    updatedAt: placeEntity.updatedAt,
  }

  return placeWriteRecord
}

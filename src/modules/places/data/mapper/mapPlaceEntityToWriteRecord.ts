import { sharedUtils } from '../../../shared/utils/shared.utils.js'
import { PlaceEntity } from '../../entities/place.entity.js'
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
    name: placeEntity.name,
    shortSummary: placeEntity.shortSummary,
    categories: placeEntity.categories,
    open24Hours: placeEntity.open24Hours,
    openingTime: placeEntity.openingTime,
    closingTime: placeEntity.closingTime,
    rating: placeEntity.rating,
    ticketPrice: placeEntity.ticketPrice,
    priceRange: placeEntity.priceRange,
    images: placeEntity.images,
    createdBy: placeEntity.createdBy,
    createdAt: placeEntity.createdAt,
    updatedAt: placeEntity.updatedAt,
  }

  return placeWriteRecord
}

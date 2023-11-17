import { PlaceEntity } from '#modules/places/entities/place.entity.js'
import { sharedUtils } from '#modules/shared/utils/shared.utils.js'
import { PlaceReadRecord } from '../recordTypes/placeReadRecord.type.js'

export const mapReadRecordsToPlaceEntity = ({
  placeReadRecord,
}: {
  placeReadRecord: PlaceReadRecord
}): PlaceEntity => {
  const placeEntity: PlaceEntity = {
    id: placeReadRecord._id.toString(),
    name: placeReadRecord.name,
    shortSummary: placeReadRecord.shortSummary,
    categories: placeReadRecord.categories,
    openingTime: placeReadRecord.openingTime,
    closingTime: placeReadRecord.closingTime,
    coordinates: sharedUtils.mongoPointToCoordinates({
      point: placeReadRecord.point,
    }),
    rating: placeReadRecord.rating,
    ticketPrice: placeReadRecord.ticketPrice,
    images: placeReadRecord.images.map((image) => ({
      id: image.id,
      width: image.width,
      height: image.height,
      url: image.url,
      filename: image.filename,
      size: image.size,
      type: image.type,
      thumbnails: {
        small: {
          url: image.thumbnails.small.url,
          width: image.thumbnails.small.width,
          height: image.thumbnails.small.height,
        },
        large: {
          url: image.thumbnails.large.url,
          width: image.thumbnails.large.width,
          height: image.thumbnails.large.height,
        },
        full: {
          url: image.thumbnails.full.url,
          width: image.thumbnails.full.width,
          height: image.thumbnails.full.height,
        },
      },
    })),
    createdBy: {
      id: placeReadRecord.createdBy.id,
      email: placeReadRecord.createdBy.email,
      name: placeReadRecord.createdBy.name,
    },
    createdAt: placeReadRecord.createdAt,
    updatedAt: placeReadRecord.updatedAt,
  }

  return placeEntity
}

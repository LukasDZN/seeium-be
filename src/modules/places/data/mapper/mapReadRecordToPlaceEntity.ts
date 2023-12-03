import { sharedUtils } from '../../../shared/utils/shared.utils.js'
import { PlaceEntity } from '../../entities/place.entity.js'
import { PlaceReadRecord } from '../recordTypes/placeReadRecord.type.js'

export const mapReadRecordToPlaceEntity = ({
  placeReadRecord,
}: {
  placeReadRecord: PlaceReadRecord
}): PlaceEntity => {
  const placeEntity: PlaceEntity = {
    id: placeReadRecord._id.toString(),
    name: placeReadRecord.name,
    shortSummary: placeReadRecord.shortSummary,
    categories: placeReadRecord.categories,
    open24Hours: placeReadRecord.open24Hours ?? undefined,
    openingTime: placeReadRecord.openingTime ?? undefined,
    closingTime: placeReadRecord.closingTime ?? undefined,
    coordinates: sharedUtils.mongoPointToCoordinates({
      point: placeReadRecord.point,
    }),
    rating: placeReadRecord.rating ?? undefined,
    ticketPrice: placeReadRecord.ticketPrice ?? undefined,
    priceRange: placeReadRecord.priceRange ?? undefined,
    images: placeReadRecord.images.map((image) => ({
      id: image.id,
      cloudinary: {
        id: image.cloudinary.id,
        url: image.cloudinary.url,
      },
      url: image.url,
      filename: image.filename,
      // width: image.width,
      // height: image.height,
      // size: image.size,
      // type: image.type,
      // thumbnails: {
      //   small: {
      //     url: image.thumbnails.small.url,
      //     width: image.thumbnails.small.width,
      //     height: image.thumbnails.small.height,
      //   },
      //   large: {
      //     url: image.thumbnails.large.url,
      //     width: image.thumbnails.large.width,
      //     height: image.thumbnails.large.height,
      //   },
      //   full: {
      //     url: image.thumbnails.full.url,
      //     width: image.thumbnails.full.width,
      //     height: image.thumbnails.full.height,
      //   },
      // },
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

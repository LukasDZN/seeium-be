import { sharedUtils } from '../../../../../shared/utils/shared.utils.js'
import { GetPlaceEntity } from '../../getPlace.entity.js'
import { GetPlaceReadRecord } from '../recordTypes/getPlaceReadRecord.type.js'

export const mapReadRecordToPlaceEntity = ({
  getPlaceReadRecord,
}: {
  getPlaceReadRecord: GetPlaceReadRecord
}): GetPlaceEntity => {
  const source = getPlaceReadRecord

  const getPlaceEntity: GetPlaceEntity = {
    id: source._id.toString(),
    name: source.name,
    shortSummary: source.shortSummary,
    categories: source.categories,
    open24Hours: source.open24Hours ?? undefined,
    openingTime: source.openingTime ?? undefined,
    closingTime: source.closingTime ?? undefined,
    coordinates: sharedUtils.mongoPointToCoordinates({
      point: source.point,
    }),
    rating: source.rating ?? undefined,
    ticketPrice: source.ticketPrice ?? undefined,
    priceRange: source.priceRange ?? undefined,
    images: source.images.map((image) => ({
      cloudinary: {
        url: image.cloudinary.url,
      },
    })),
  }

  return getPlaceEntity
}

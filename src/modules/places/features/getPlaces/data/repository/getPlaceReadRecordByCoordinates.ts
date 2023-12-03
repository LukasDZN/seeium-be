import { generalLogger } from '../../../../../../server.js'
import { Coordinates } from '../../../../../shared/types/Coordinates.type.js'
import { PlaceModel } from '../../../../data/places.model.js'
import { GetPlaceReadRecord } from '../recordTypes/getPlaceReadRecord.type.js'

const DEFAULT_SEARCH_RADIUS_IN_METERS = 5_000
const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 10

export const getPlaceReadRecordsByCoordinates = async ({
  coordinates,
  searchRadiusInMeters,
  offset,
  limit,
}: {
  coordinates: Coordinates
  searchRadiusInMeters?: number
  offset?: number
  limit?: number
}): Promise<GetPlaceReadRecord[]> => {
  const mongoQuery = {
    point: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [coordinates.longitude, coordinates.latitude],
        },
        $maxDistance: searchRadiusInMeters ?? DEFAULT_SEARCH_RADIUS_IN_METERS,
      },
    },
  }

  const placeReadRecords: GetPlaceReadRecord[] = await PlaceModel.find(
    mongoQuery
  )
    .skip(offset || DEFAULT_OFFSET)
    .limit(limit || DEFAULT_LIMIT)
    .select(
      `
      -__v

      -point._id

      -images.id
      -images.url
      -images.filename

      -images.cloudinary._id
      -images.cloudinary.id

      -createdBy
      -createdAt
      -updatedAt
    `
    )
    .lean()
    .exec()

  if (!placeReadRecords.length) {
    generalLogger.debug(`❌ ${getPlaceReadRecordsByCoordinates.name}`)

    return []
  }

  generalLogger.debug(`✅ ${getPlaceReadRecordsByCoordinates.name}`)

  return placeReadRecords
}

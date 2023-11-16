import { Coordinates } from '#modules/shared/types/Coordinates.type.js'
import { logger } from '../../../../app.js'
import { PlaceModel } from '../places.model.js'
import { PlaceReadRecord } from '../recordTypes/placeReadRecord.type.js'

const DEFAULT_SEARCH_RADIUS_IN_METERS = 5_000
const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 20

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
}): Promise<PlaceReadRecord[]> => {
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

  const placeReadRecords: PlaceReadRecord[] = await PlaceModel.find(mongoQuery)
    .skip(offset || DEFAULT_OFFSET)
    .limit(limit || DEFAULT_LIMIT)
    .lean()
    .exec()

  if (!placeReadRecords.length) {
    logger.debug(`❌ placeReadRecords not found by coordinates`)

    return []
  }

  logger.debug(`✅ placeReadRecords found by coordinates`)

  return placeReadRecords
}

import { Coordinates } from '../../../../shared/types/Coordinates.type.js'
import { getPlacesMapper } from '../data/mapper/getPlaces.mapper.js'
import { getPlacesRepository } from '../data/repository/getPlaces.repository.js'
import { GetPlaceEntity } from '../getPlace.entity.js'

type GetPlaceEntitiesByCoordinatesUseCase = ({
  coordinates,
  searchRadiusInMeters,
  offset,
  limit,
}: {
  coordinates: Coordinates
  searchRadiusInMeters?: number
  offset?: number
  limit?: number
}) => Promise<GetPlaceEntity[] | null>

export const getPlaceEntitiesByCoordinates: GetPlaceEntitiesByCoordinatesUseCase =
  async ({ coordinates, searchRadiusInMeters, offset, limit }) => {
    const getPlaceReadRecords =
      await getPlacesRepository.getPlaceReadRecordsByCoordinates({
        coordinates,
        searchRadiusInMeters,
        offset,
        limit,
      })

    if (!getPlaceReadRecords.length) {
      return null
    }

    const getPlaceEntities = getPlaceReadRecords.map((getPlaceReadRecord) => {
      const getPlaceEntity = getPlacesMapper.mapReadRecordToPlaceEntity({
        getPlaceReadRecord,
      })

      return getPlaceEntity
    })

    return getPlaceEntities
  }

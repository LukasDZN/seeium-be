import { Coordinates } from '../../../../shared/types/Coordinates.type.js'
import { placesMapper } from '../../../data/mapper/places.mapper.js'
import { placesRepository } from '../../../data/repository/places.repository.js'
import { PlaceEntity } from '../../../entities/place.entity.js'

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
}) => Promise<PlaceEntity[] | null>

export const getPlaceEntitiesByCoordinates: GetPlaceEntitiesByCoordinatesUseCase =
  async ({ coordinates, searchRadiusInMeters, offset, limit }) => {
    const placeReadRecords =
      await placesRepository.getPlaceReadRecordsByCoordinates({
        coordinates,
        searchRadiusInMeters,
        offset,
        limit,
      })

    if (!placeReadRecords.length) {
      return null
    }

    const placeEntities = placeReadRecords.map((placeReadRecord) => {
      const placeEntity = placesMapper.mapReadRecordToPlaceEntity({
        placeReadRecord,
      })

      return placeEntity
    })

    return placeEntities
  }

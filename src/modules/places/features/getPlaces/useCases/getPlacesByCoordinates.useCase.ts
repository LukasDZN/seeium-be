import { placesMapper } from '#modules/places/data/mapper/places.mapper.js'
import { placesRepository } from '#modules/places/data/repository/places.repository.js'
import { PlaceEntity } from '#modules/places/entities/place.entity.js'
import { Coordinates } from '#modules/shared/types/Coordinates.type.js'

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

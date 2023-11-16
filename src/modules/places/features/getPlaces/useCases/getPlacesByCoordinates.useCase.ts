import { placesMapper } from '#modules/places/data/mapper/places.mapper.js'
import { placesRepository } from '#modules/places/data/repository/places.repository.js'
import { PlacesEntity } from '#modules/places/entities/places.entity.js'
import { Coordinates } from '#modules/shared/types/Coordinates.type.js'

type GetPlacesEntityByCoordinatesUseCase = ({
  coordinates,
  searchRadiusInMeters,
  offset,
  limit,
}: {
  coordinates: Coordinates
  searchRadiusInMeters?: number
  offset?: number
  limit?: number
}) => Promise<PlacesEntity | null>

export const getPlacesEntityByCoordinates: GetPlacesEntityByCoordinatesUseCase =
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

    const placesEntity = placesMapper.readRecordToPlaceEntity({
      placeReadRecords,
    })

    return placesEntity
  }

import { getDistance } from 'geolib'
import { StatusCodes } from 'http-status-codes'
import { GetPlaceResponseDto } from './getPlaces.dtos.js'
import { validateGetPlaceRequest } from './getPlaces.validator.js'
import { getPlacesUseCases } from './useCases/getPlaces.useCases.js'
import { sharedConstants } from '../../../shared/constants/shared.constants.js'
import { Controller } from '../../../shared/types/Controller.type.js'
import { HttpResponse } from '../../../shared/types/HttpResponse.js'

export const getPlaceController: Controller<
  HttpResponse<GetPlaceResponseDto>
> = async ({ httpRequest }) => {
  const request = validateGetPlaceRequest({ httpRequest })

  const { latitude, longitude, searchRadiusInMeters, offset, limit } =
    request.query

  const coordinates = {
    latitude,
    longitude,
  }

  const placeEntities = await getPlacesUseCases.getPlaceEntitiesByCoordinates({
    coordinates,
    searchRadiusInMeters,
    offset,
    limit,
  })

  if (!placeEntities || !placeEntities.length) {
    const placesNotFoundHttpResponse = {
      statusCode: StatusCodes.OK,
      body: {
        places: [],
      },
    }

    return placesNotFoundHttpResponse
  }

  const filteredFieldEntities = placeEntities.map((placeEntity) => {
    const distanceToPlaceInMeters = getDistance(
      coordinates,
      placeEntity.coordinates
    )

    return {
      distanceToPlaceInMeters: distanceToPlaceInMeters,
      ...placeEntity,
      createdBy: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }
  })

  const getPlacesSuccessHttpResponse = {
    headers: {
      'cache-control': `public, max-age=${sharedConstants.time.ONE_HOUR_IN_SECONDS}`,
    },
    statusCode: StatusCodes.OK,
    body: {
      places: filteredFieldEntities,
    },
  }

  return getPlacesSuccessHttpResponse
}

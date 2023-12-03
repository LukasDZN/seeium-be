import { getDistance } from 'geolib'
import { StatusCodes } from 'http-status-codes'
import { sharedConstants } from '../../../shared/constants/shared.constants.js'
import { Controller } from '../../../shared/types/Controller.type.js'
import { HttpResponse } from '../../../shared/types/HttpResponse.js'
import { GetPlaceResponseDto } from './getPlaces.dtos.js'
import { validateGetPlacesRequest } from './getPlaces.validator.js'
import { getPlacesUseCases } from './useCases/getPlaces.useCases.js'

export const getPlacesController: Controller<
  HttpResponse<GetPlaceResponseDto>
> = async ({ httpRequest }) => {
  const request = validateGetPlacesRequest({ httpRequest })

  const { latitude, longitude, searchRadiusInMeters, offset, limit } =
    request.query

  const coordinates = {
    latitude,
    longitude,
  }

  const getPlaceEntities =
    await getPlacesUseCases.getPlaceEntitiesByCoordinates({
      coordinates,
      searchRadiusInMeters,
      offset,
      limit,
    })

  if (!getPlaceEntities || !getPlaceEntities.length) {
    const placesNotFoundHttpResponse = {
      statusCode: StatusCodes.OK,
      body: {
        places: [],
      },
    }

    return placesNotFoundHttpResponse
  }

  const filteredFieldEntities = getPlaceEntities.map((placeEntity) => {
    const distanceToPlaceInMeters = getDistance(
      coordinates,
      placeEntity.coordinates
    )

    return {
      ...placeEntity,
      distanceToPlaceInMeters: distanceToPlaceInMeters,
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

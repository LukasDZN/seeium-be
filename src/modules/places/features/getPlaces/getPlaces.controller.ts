import { Controller } from '#modules/shared/types/Controller.type.js'
import { StatusCodes } from 'http-status-codes'
import { validateGetPlaceRequest } from './getPlaces.validator.js'
import { getPlacesUseCases } from './useCases/getPlaces.useCases.js'
import { sharedConstants } from '#modules/shared/constants/shared.constants.js'

export const getPlaceController: Controller = async ({ httpRequest }) => {
  const request = validateGetPlaceRequest({ httpRequest })

  const { latitude, longitude, searchRadiusInMeters, offset, limit } = request.query

  const coordinates = {
    latitude,
    longitude,
  }

  const placesEntity = await getPlacesUseCases.getPlacesEntityByCoordinates({
    coordinates,
    searchRadiusInMeters,
    offset,
    limit,
  })

  if (!placesEntity || !placesEntity.places.length) {
    const placesNotFoundHttpResponse = {
      statusCode: StatusCodes.OK,
      body: {
        places: [],
      },
    }

    return placesNotFoundHttpResponse
  }

  const getPlacesSuccessHttpResponse = {
    headers: {
      'cache-control': `public, max-age=${sharedConstants.time.ONE_HOUR_IN_SECONDS}`,
    },
    statusCode: StatusCodes.OK,
    body: {
      places: placesEntity.places,
    },
  }

  return getPlacesSuccessHttpResponse
}
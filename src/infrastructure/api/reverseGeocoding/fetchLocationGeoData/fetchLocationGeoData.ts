import axios from 'axios'
import { envVariables } from '../../../../config/envVariables.js'
import { Coordinates } from '../../../../modules/shared/types/Coordinates.type.js'
import {
  LocationGeoDataRequestDto,
  LocationGeoDataSuccessResponseDto,
} from './formattedGeoData.dtos.js'
import { formattedGeoDataResponseDtoSchema } from './formattedGeoDataResponseDto.validator.js'

export type FetchCitySafetyByCoordinatesApiPortRequest = {
  coordinates: Coordinates
}

export type FetchLocationGeoDataApiPortResponse = {
  cityName: string
  countryCode: string
}

export type FetchLocationGeoDataApiPort = ({
  coordinates,
}: FetchCitySafetyByCoordinatesApiPortRequest) => Promise<FetchLocationGeoDataApiPortResponse>

export const fetchLocationGeoDataApi: FetchLocationGeoDataApiPort = async ({
  coordinates,
}: {
  coordinates: Coordinates
}) => {
  const reverseGeocoderRequestUrl = new URL(
    envVariables.REVERSE_GEOCODING_API_URL
  )

  reverseGeocoderRequestUrl.pathname = '/api/v1/mapCoordinatesToCity'

  const locationGeoDataRequestDto: LocationGeoDataRequestDto = {
    latitude: `${coordinates.latitude}`,
    longitude: `${coordinates.longitude}`,
  }

  for (const [key, value] of Object.entries(locationGeoDataRequestDto)) {
    reverseGeocoderRequestUrl.searchParams.append(key, value)
  }

  const axiosResponse = await axios({
    method: 'GET',
    url: reverseGeocoderRequestUrl.href,
    timeout: 5_000,
  })

  const locationGeoDataResponseDto = axiosResponse.data

  const validatedSuccessResponseDto: LocationGeoDataSuccessResponseDto =
    formattedGeoDataResponseDtoSchema.parse(locationGeoDataResponseDto)

  const locationGeoDataApiPortResponse = {
    cityName: validatedSuccessResponseDto.geoData.asciiName,
    countryCode: validatedSuccessResponseDto.geoData.countryCode,
  }

  return locationGeoDataApiPortResponse
}

import { z } from 'zod'
import { formattedGeoDataResponseDtoSchema } from './formattedGeoDataResponseDto.validator.js'

export type LocationGeoDataRequestDto = {
  latitude: string
  longitude: string
}

export type LocationGeoDataSuccessResponseDto = z.infer<
  typeof formattedGeoDataResponseDtoSchema
>

import { z } from 'zod'
import {
  coordinateLatitudeNumericSchema,
  coordinateLongitudeNumericSchema,
} from '../../../shared/shared.validations.js'
import { HttpRequest } from '../../../shared/types/HttpRequest.js'
import { GetPlacesRequestDto } from './getPlaces.dtos.js'

export const GetPlacesRequestSchema = z.object({
  params: z.object({}),
  query: z.object({
    latitude: coordinateLatitudeNumericSchema,
    longitude: coordinateLongitudeNumericSchema,
    searchRadiusInMeters: z.coerce.number().int().positive().optional(),
    offset: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
  }),
  body: z.object({}),
})

type ValidateGetPlacesRequest = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => GetPlacesRequestDto

export const validateGetPlacesRequest: ValidateGetPlacesRequest = ({
  httpRequest,
}) => {
  return GetPlacesRequestSchema.parse(httpRequest)
}

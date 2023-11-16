import { z } from 'zod'
import {
  coordinateLatitudeNumericSchema,
  coordinateLongitudeNumericSchema,
} from '../../../shared/shared.validations.js'
import { HttpRequest } from '../../../shared/types/HttpRequest.js'
import { GetPlaceRequestDto } from './getPlaces.dtos.js'

export const GetPlaceRequestSchema = z.object({
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

type validateGetPlaceRequest = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => GetPlaceRequestDto

export const validateGetPlaceRequest: validateGetPlaceRequest = ({
  httpRequest,
}) => {
  return GetPlaceRequestSchema.parse(httpRequest)
}

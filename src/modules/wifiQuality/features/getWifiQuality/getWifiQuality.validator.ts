import { z } from 'zod'
import {
  coordinateLatitudeNumericSchema,
  coordinateLongitudeNumericSchema,
} from '../../../shared/shared.validations.js'
import { HttpRequest } from '../../../shared/types/HttpRequest.js'
import { GetWifiQualityRequestDto } from './getWifiQuality.dtos.js'

export const WifiQualityGetRequestSchema = z.object({
  params: z.object({}),
  query: z.object({
    latitude: coordinateLatitudeNumericSchema,
    longitude: coordinateLongitudeNumericSchema,
  }),
  body: z.object({}),
})

type WifiQualityGetRequestValidator = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => GetWifiQualityRequestDto

export const validateGetWifiQualityRequest: WifiQualityGetRequestValidator = ({
  httpRequest,
}) => {
  return WifiQualityGetRequestSchema.parse(httpRequest)
}

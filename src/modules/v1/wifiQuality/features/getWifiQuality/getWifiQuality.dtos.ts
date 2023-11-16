import { z } from 'zod'
// import { HttpResponse } from '../../../shared/types/HttpRequest.js'
import { WifiQualityGetRequestSchema } from './getWifiQuality.validator.js'

export type GetWifiQualityRequestDto = z.infer<
  typeof WifiQualityGetRequestSchema
>

// export type GetWifiQualityResponseDto = HttpResponse<{
//   wifiQuality: WifiQuality
// }>

export type WifiQuality = {
  downloadMbps: number
  uploadMbps: number
  ping: {
    idleLatency: number
  }
} | null

import { Controller } from '#modules/shared/types/Controller.type.js'
import { StatusCodes } from 'http-status-codes'
import { sharedUtils } from '../../../shared/utils/shared.utils.js'
import { validateGetWifiQualityRequest } from './getWifiQuality.validator.js'
import { getWifiQualityEntityByCoordinatesUseCase } from './getWifiQualityByCoordinates.useCase.js'

export const getWifiQualityController: Controller = async ({ httpRequest }) => {
  const request = validateGetWifiQualityRequest({ httpRequest })

  const { latitude, longitude } = request.query

  const coordinates = {
    latitude,
    longitude,
  }

  const wifiQualityEntity = await getWifiQualityEntityByCoordinatesUseCase({
    coordinates,
  })

  if (!wifiQualityEntity) {
    const WifiQualityNotFoundHttpResponse = {
      statusCode: StatusCodes.NOT_FOUND,
      body: {
        wifiQuality: null,
      },
    }

    return WifiQualityNotFoundHttpResponse
  }

  const getWifiQualityHttpResponse = {
    headers: {
      // 'cache-control': `public, max-age=${sharedConstants.time.ONE_HOUR_IN_SECONDS}`,
    },
    statusCode: StatusCodes.OK,
    body: {
      wifiQuality: {
        downloadMbps: sharedUtils.roundFloat(
          wifiQualityEntity.getReducedAverageDownloadMbps(),
          0
        ),
        uploadMbps: sharedUtils.roundFloat(
          wifiQualityEntity.getReducedAverageUploadMbps()
        ),
        ping: {
          idleLatency: sharedUtils.roundFloat(
            wifiQualityEntity.getAverageLatencyMs()
          ),
        },
      },
    },
  }

  return getWifiQualityHttpResponse
}

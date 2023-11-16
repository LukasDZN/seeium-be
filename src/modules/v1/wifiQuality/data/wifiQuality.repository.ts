import { logger } from '../../../../app.js'
import { Coordinates } from '../../shared/types/Coordinates.type.js'
import { WifiQualityWriteRecord } from '../features/createWifiQuality/createWifiQuality.record.type.js'
import { WifiQualityReadRecord } from '../features/getWifiQuality/getWifiQuality.record.type.js'
import { WifiQualityModel } from './wifiQuality.model.js'

const getWifiQualityReadRecordByCoordinates = async ({
  coordinates,
}: {
  coordinates: Coordinates
}): Promise<WifiQualityReadRecord | null> => {
  const SEARCH_RADIUS_IN_METERS = 3_000

  const mongoQuery = {
    point: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [coordinates.longitude, coordinates.latitude],
        },
        $maxDistance: SEARCH_RADIUS_IN_METERS,
      },
    },
  }

  const wifiQualityReadRecord: WifiQualityReadRecord | null =
    await WifiQualityModel.findOne(mongoQuery).lean().exec()

  if (!wifiQualityReadRecord) {
    logger.debug(`❌ wifiQualityDocument not found by coordinates`)

    return null
  }

  logger.debug(`✅ wifiQualityDocument found by coordinates`)

  return wifiQualityReadRecord
}

const createWifiQualityDocument = async ({
  wifiQualityWriteRecord,
}: {
  wifiQualityWriteRecord: WifiQualityWriteRecord
}): Promise<WifiQualityReadRecord> => {
  const wifiQualityModel = new WifiQualityModel(wifiQualityWriteRecord)

  const createdWifiQualityDocument: WifiQualityReadRecord =
    await wifiQualityModel.save()

  if (createdWifiQualityDocument) {
    logger.debug(`✅ WifiQuality document created`)
  } else {
    logger.debug(`❌ WifiQuality document not created`)
  }

  return createdWifiQualityDocument
}

export const wifiQualityRepository = {
  getWifiQualityReadRecordByCoordinates,
  createWifiQualityDocument,
} as const

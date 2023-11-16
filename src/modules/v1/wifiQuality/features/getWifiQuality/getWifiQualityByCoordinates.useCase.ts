import { Coordinates } from '../../../shared/types/Coordinates.type.js'
import { wifiQualityMapper } from '../../data/wifiQuality.mapper.js'
import { wifiQualityRepository } from '../../data/wifiQuality.repository.js'
import { WifiQualityEntity } from '../../entities/wifiQuality.entity.js'

type GetWifiQualityEntityByCoordinatesUseCase = ({
  coordinates,
}: {
  coordinates: Coordinates
}) => Promise<WifiQualityEntity | null>

export const getWifiQualityEntityByCoordinatesUseCase: GetWifiQualityEntityByCoordinatesUseCase =
  async ({ coordinates }) => {
    const wifiQualityReadRecord =
      await wifiQualityRepository.getWifiQualityReadRecordByCoordinates({
        coordinates,
      })

    if (!wifiQualityReadRecord) {
      return null
    }

    const wifiQualityEntity = wifiQualityMapper.readRecordToWifiQualityEntity({
      wifiQualityReadRecord,
    })

    return wifiQualityEntity
  }

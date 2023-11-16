import {
  MakeWifiQualityEntityInput,
  WifiQualityEntity,
  makeWifiQualityEntity,
} from '../entities/wifiQuality.entity.js'
import { WifiQualityReadRecord } from '../features/getWifiQuality/getWifiQuality.record.type.js'

const readRecordToMakeWifiQualityEntityInput = ({
  wifiQualityReadRecord,
}: {
  wifiQualityReadRecord: WifiQualityReadRecord
}): MakeWifiQualityEntityInput => {
  const { ...properties } = wifiQualityReadRecord.properties

  const makeWifiQualityEntityInput: MakeWifiQualityEntityInput = {
    properties,
  }

  return makeWifiQualityEntityInput
}

const readRecordToWifiQualityEntity = ({
  wifiQualityReadRecord,
}: {
  wifiQualityReadRecord: WifiQualityReadRecord
}): WifiQualityEntity => {
  const makeWifiQualityEntityInput = readRecordToMakeWifiQualityEntityInput({
    wifiQualityReadRecord,
  })

  const wifiQualityEntity = makeWifiQualityEntity({
    ...makeWifiQualityEntityInput,
  })

  return wifiQualityEntity
}

export const wifiQualityMapper = {
  readRecordToWifiQualityEntity,
} as const

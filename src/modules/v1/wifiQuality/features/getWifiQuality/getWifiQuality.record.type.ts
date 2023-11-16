import { _Id } from '../../../shared/types/mongoDb.types.js'
import {
  AverageDownloadKbps,
  AverageLatencyMs,
  AverageUploadKbps,
  DataType,
  QuadrantKey,
  TestRunCount,
  UniqueDevicesCount,
} from '../../wifiQuality.types.js'

export type WifiQualityReadRecord = {
  _id: _Id
  dataType: DataType
  properties: {
    quadrantKey: QuadrantKey
    averageDownloadKbps: AverageDownloadKbps
    averageUploadKbps: AverageUploadKbps
    averageLatencyMs: AverageLatencyMs
    testRunCount: TestRunCount
    uniqueDevicesCount: UniqueDevicesCount
  }
  point: { type: string; coordinates: number[] } // ? Temporary workaround to Typescript bug. Type should be Point
}

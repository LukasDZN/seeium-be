import { Point } from '../../../shared/types/mongoDb.types.js'
import {
  AverageDownloadKbps,
  AverageLatencyMs,
  AverageUploadKbps,
  DataType,
  QuadrantKey,
  TestRunCount,
  UniqueDevicesCount,
} from '../../wifiQuality.types.js'

export type WifiQualityWriteRecord = {
  dataType: DataType
  properties: {
    quadrantKey: QuadrantKey
    averageDownloadKbps: AverageDownloadKbps
    averageUploadKbps: AverageUploadKbps
    averageLatencyMs: AverageLatencyMs
    testRunCount: TestRunCount
    uniqueDevicesCount: UniqueDevicesCount
  }
  point: Point
}

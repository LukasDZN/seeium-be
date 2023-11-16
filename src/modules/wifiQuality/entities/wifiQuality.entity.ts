import {
  AverageDownloadKbps,
  AverageLatencyMs,
  AverageUploadKbps,
  TestRunCount,
  UniqueDevicesCount,
} from '../wifiQuality.types.js'

export type WifiQualityEntity = ReturnType<typeof makeWifiQualityEntity>

export type MakeWifiQualityEntityInput = {
  properties: {
    averageDownloadKbps: AverageDownloadKbps
    averageUploadKbps: AverageUploadKbps
    averageLatencyMs: AverageLatencyMs
    testRunCount: TestRunCount
    uniqueDevicesCount: UniqueDevicesCount
  }
}

export const makeWifiQualityEntity = ({
  properties,
}: MakeWifiQualityEntityInput) => {
  const REDUCE_BY_TEN_PERCENT = 0.9

  // Add a random jitter of 0-3% to the reduced average download/upload
  // to simulate the variance in the data.
  const MAX_JITTER_THREE_PERCENT = 0.03

  const distortNumber = (number: number) => {
    const randomJitter = Math.random() * MAX_JITTER_THREE_PERCENT
    const distortedNumber = number * (1 - randomJitter)

    return distortedNumber
  }

  const getReducedAverageDownloadMbps = () => {
    const reducedAverageDownloadKbps =
      properties.averageDownloadKbps * REDUCE_BY_TEN_PERCENT
    const reducedAverageDownloadMbps = reducedAverageDownloadKbps / 1000
    const distortedReducedAverageDownloadMbps = distortNumber(
      reducedAverageDownloadMbps
    )

    return distortedReducedAverageDownloadMbps
  }

  const getReducedAverageUploadMbps = () => {
    const reducedAverageUploadKbps =
      properties.averageUploadKbps * REDUCE_BY_TEN_PERCENT
    const reducedAverageUploadMbps = reducedAverageUploadKbps / 1000
    const distortedReducedAverageUploadMbps = distortNumber(
      reducedAverageUploadMbps
    )

    return distortedReducedAverageUploadMbps
  }

  const getAverageLatencyMs = () => {
    const distortedAverageLatencyMs = distortNumber(properties.averageLatencyMs)

    return distortedAverageLatencyMs
  }

  return {
    getReducedAverageDownloadMbps,
    getReducedAverageUploadMbps,
    getAverageLatencyMs,
  } as const
}

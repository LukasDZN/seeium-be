import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { sharedUtils } from '../shared.utils.js'

export const axiosRetryWrapper = async <T>({
  axiosRequestConfig,
  retryCount,
  sleepDurationsInMs,
}: {
  axiosRequestConfig: AxiosRequestConfig
  retryCount: number
  sleepDurationsInMs: number[]
}): Promise<AxiosResponse<T>> => {
  if (retryCount <= 0) {
    throw new Error('Retry count must be greater than or equal to 0')
  }

  if (sleepDurationsInMs.length !== retryCount) {
    throw new Error('Each retry count must have a corresponding sleep duration')
  }

  try {
    const axiosResponse = await axios(axiosRequestConfig)

    return axiosResponse
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error
    }

    const noRetriesLeft = retryCount <= 0
    const tooManyRequests =
      error.response?.status === StatusCodes.TOO_MANY_REQUESTS

    const stopRetrying = noRetriesLeft || tooManyRequests

    if (stopRetrying) {
      throw error
    }

    const sleepDurationInMs = sleepDurationsInMs[retryCount]

    if (!sleepDurationInMs) {
      throw new Error(`No sleep duration found for retry count '${retryCount}'`)
    }

    await sharedUtils.sleep(sleepDurationInMs)

    // Retry the request
    return axiosRetryWrapper({
      axiosRequestConfig,
      retryCount: retryCount - 1,
      sleepDurationsInMs,
    })
  }
}

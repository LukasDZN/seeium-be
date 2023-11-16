import axios from 'axios'
import { sharedErrors } from '../errors/index.js'

export const handleAxiosError = (error: unknown, providerName: string) => {
  // Check if the error is an axios error
  if (!axios.isAxiosError(error)) {
    return
  }

  const statusCode = error.response?.status

  if (!statusCode) {
    // If an axios error doesn't have a status code, it may be a network error
    throw new sharedErrors.api.NetworkError(
      'Axios error, no status code received from the server. This may be a network error or provider crashed.',
      providerName,
      '',
      error
    )
  }

  const message = `Encountered an axios error when sending a request to '${providerName}' provider. Status code: '${statusCode}'`

  if (statusCode >= 400 && statusCode <= 499) {
    throw new sharedErrors.api.ClientError(message, providerName, '', error)
  }

  if (statusCode >= 500 && statusCode <= 599) {
    throw new sharedErrors.api.InternalServerError(
      message,
      providerName,
      '',
      error
    )
  }
}

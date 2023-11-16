import { AxiosResponse } from 'axios'

export const wasAxiosRequestRedirected = (response: AxiosResponse): boolean => {
  const originalUrl: string | undefined = response.config.url
  const redirectedUrl: string = response.request.res.responseUrl

  return originalUrl !== redirectedUrl
}

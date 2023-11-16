import { describe } from 'vitest'

describe.todo('unimplemented axios retry wrapper test')

// import axios from 'axios'
// import { afterEach, describe, expect, it } from 'vitest'
// import { axiosRetryWrapper } from './axiosRetry.wrapper.js'

// // Vitest mock axios

// describe('axiosRetryWrapper', () => {
//   afterEach(() => {
//     clearAllMocks()
//   })

//   it('should retry the request if it fails with a 429 status code', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 3
//     const sleepDurationsInMs = [1000, 2000, 3000]

//     const mockedAxiosResponse = { data: 'example data' }
//     const mockedAxiosError = {
//       isAxiosError: true,
//       response: { status: 429 },
//     }

//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedAxiosError)
//     })
//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedAxiosError)
//     })
//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedAxiosError)
//     })
//     axios.mockImplementationOnce(() => {
//       return Promise.resolve(mockedAxiosResponse)
//     })

//     const result = await axiosRetryWrapper({
//       axiosRequestConfig,
//       retryCount,
//       sleepDurationsInMs,
//     })

//     expect(result).toEqual(mockedAxiosResponse)
//     expect(axios).toHaveBeenCalledTimes(4)
//     expect(axios).toHaveBeenCalledWith(axiosRequestConfig)
//     expect(axios).toHaveBeenNthCalledWith(2, axiosRequestConfig)
//     expect(axios).toHaveBeenNthCalledWith(3, axiosRequestConfig)
//     expect(axios).toHaveBeenNthCalledWith(4, axiosRequestConfig)
//   })

//   it('should throw an error if retry count is less than or equal to 0', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 0
//     const sleepDurationsInMs = [1000]

//     await expect(
//       axiosRetryWrapper({
//         axiosRequestConfig,
//         retryCount,
//         sleepDurationsInMs,
//       })
//     ).rejects.toThrow('Retry count must be greater than or equal to 0')

//     expect(axios).not.toHaveBeenCalled()
//   })

//   it('should throw an error if sleep durations array length does not match retry count', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 3
//     const sleepDurationsInMs = [1000, 2000]

//     await expect(
//       axiosRetryWrapper({
//         axiosRequestConfig,
//         retryCount,
//         sleepDurationsInMs,
//       })
//     ).rejects.toThrow(
//       'Each retry count must have a corresponding sleep duration'
//     )

//     expect(axios).not.toHaveBeenCalled()
//   })

//   it('should throw an error if the error is not an Axios error', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 3
//     const sleepDurationsInMs = [1000, 2000, 3000]

//     const mockedError = new Error('example error')

//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedError)
//     })

//     await expect(
//       axiosRetryWrapper({
//         axiosRequestConfig,
//         retryCount,
//         sleepDurationsInMs,
//       })
//     ).rejects.toThrow(mockedError)

//     expect(axios).toHaveBeenCalledTimes(1)
//     expect(axios).toHaveBeenCalledWith(axiosRequestConfig)
//   })

//   it('should throw an error if there are no retries left', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 0
//     const sleepDurationsInMs = [1000]

//     const mockedAxiosError = {
//       isAxiosError: true,
//       response: { status: 429 },
//     }

//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedAxiosError)
//     })

//     await expect(
//       axiosRetryWrapper({
//         axiosRequestConfig,
//         retryCount,
//         sleepDurationsInMs,
//       })
//     ).rejects.toThrow(mockedAxiosError)

//     expect(axios).toHaveBeenCalledTimes(1)
//     expect(axios).toHaveBeenCalledWith(axiosRequestConfig)
//   })

//   it('should throw an error if the error response status is not 429', async () => {
//     const axiosRequestConfig = { url: 'https://example.com' }
//     const retryCount = 3
//     const sleepDurationsInMs = [1000, 2000, 3000]

//     const mockedAxiosError = {
//       isAxiosError: true,
//       response: { status: 500 },
//     }

//     axios.mockImplementationOnce(() => {
//       return Promise.reject(mockedAxiosError)
//     })

//     await expect(
//       axiosRetryWrapper({
//         axiosRequestConfig,
//         retryCount,
//         sleepDurationsInMs,
//       })
//     ).rejects.toThrow(mockedAxiosError)

//     expect(axios).toHaveBeenCalledTimes(1)
//     expect(axios).toHaveBeenCalledWith(axiosRequestConfig)
//   })
// })

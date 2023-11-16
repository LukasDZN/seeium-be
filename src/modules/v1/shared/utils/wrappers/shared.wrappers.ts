import { axiosRetryWrapper } from './axiosRetry.wrapper.js'
import { expressCallbackWrapper } from './expressCallback.wrapper.js'
import { functionPerformanceWrapper } from './functionPerformance.wrapper.js'

export const sharedWrappers = {
  axiosRetryWrapper,
  expressCallbackWrapper,
  functionPerformanceWrapper,
} as const

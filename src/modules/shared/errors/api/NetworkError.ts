import { CustomBaseError } from '../CustomBaseError.js'

export class NetworkError extends CustomBaseError {
  constructor(
    customMessage: string,
    providerName: string,
    callerFunction: string,
    originalError: null | Error = null
  ) {
    super(
      NetworkError.name,
      customMessage,
      providerName,
      callerFunction,
      originalError
    )
  }
}

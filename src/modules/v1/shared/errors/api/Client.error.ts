import { CustomBaseError } from '../CustomBaseError.js'

export class ClientError extends CustomBaseError {
  constructor(
    customMessage: string,
    providerName: string,
    callerFunction: string,
    originalError: null | Error = null
  ) {
    super(
      ClientError.name,
      customMessage,
      providerName,
      callerFunction,
      originalError
    )
  }
}

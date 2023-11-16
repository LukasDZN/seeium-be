import { CustomBaseError } from '../CustomBaseError.js'

export class InternalServerError extends CustomBaseError {
  constructor(
    customMessage: string,
    providerName: string,
    callerFunction: string,
    originalError: null | Error = null
  ) {
    super(
      InternalServerError.name,
      customMessage,
      providerName,
      callerFunction,
      originalError
    )
  }
}

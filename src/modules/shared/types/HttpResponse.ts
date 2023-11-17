import { ErrorResponseDto } from './ErrorResponseDto.type.js'

export type HttpResponse<T = void> = {
  headers?: unknown
  statusCode: number
  body: T | ErrorResponseDto
}

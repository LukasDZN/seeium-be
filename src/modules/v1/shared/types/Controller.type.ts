import { HttpRequest } from './HttpRequest.js'
import { HttpResponse } from './HttpResponse.js'

export type Controller<T = HttpResponse> = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => Promise<T>

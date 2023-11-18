export type HttpRequest = {
  ip?: string
  body: unknown
  query: unknown
  params: unknown
  method: string
  path: string
  headers: {
    correlationId: string
    'Content-Type': string
    Referer: string
    'User-Agent': string
  }
  session?: unknown
  user?: unknown
}

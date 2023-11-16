export type HttpRequest = {
  body: unknown
  query: unknown
  params: unknown
  ip?: string
  method: string
  path: string
  headers: {
    uid: string
    'Content-Type': string
    Referer: string
    'User-Agent': string
  }
  session?: unknown
  user?: unknown
}

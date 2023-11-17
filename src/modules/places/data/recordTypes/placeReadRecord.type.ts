import { Point, _Id } from '#modules/shared/types/mongoDb.types.js'

export type PlaceReadRecord = {
  _id: _Id
  point: Point
  name: string
  shortSummary: string
  categories: string[]
  openingTime: number
  closingTime: number
  rating: number
  ticketPrice?: number | null
  images: {
    id: string
    width: number
    height: number
    url: string
    filename: string
    size: number
    type: string
    thumbnails: {
      small: {
        url: string
        width: number
        height: number
      }
      large: {
        url: string
        width: number
        height: number
      }
      full: {
        url: string
        width: number
        height: number
      }
    }
  }[]
  createdBy: {
    id: string
    email: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

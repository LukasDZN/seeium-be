import { Coordinates } from '#modules/shared/types/Coordinates.type.js'

export type PlaceEntity = {
  id: string
  name: string
  shortSummary: string
  categories: string[]
  openingTime: number
  closingTime: number
  coordinates: Coordinates
  rating: number
  ticketPrice?: number
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

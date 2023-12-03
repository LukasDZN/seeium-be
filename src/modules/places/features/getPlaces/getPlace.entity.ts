import { Coordinates } from '../../../shared/types/Coordinates.type.js'

export type GetPlaceEntity = {
  id: string
  name: string
  shortSummary: string
  categories: string[]
  open24Hours?: boolean
  openingTime?: number
  closingTime?: number
  coordinates: Coordinates
  rating?: number
  ticketPrice?: number
  priceRange?: string
  images: {
    cloudinary: {
      url: string
    }
  }[]
}

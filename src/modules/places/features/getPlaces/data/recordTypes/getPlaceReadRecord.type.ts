import { _Id, Point } from '../../../../../shared/types/mongoDb.types.js'

export type GetPlaceReadRecord = {
  _id: _Id
  point: Point
  name: string
  shortSummary: string
  categories: string[]
  open24Hours?: boolean | null
  openingTime?: number | null
  closingTime?: number | null
  rating?: number | null
  ticketPrice?: number | null
  priceRange?: string | null
  images: {
    cloudinary: {
      url: string
    }
  }[]
}

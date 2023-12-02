import { _Id, Point } from '../../../shared/types/mongoDb.types.js'

export type PlaceReadRecord = {
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
    id: string
    cloudinary: {
      id: string
      url: string
    }
    url: string
    filename: string
    // width: number
    // height: number
    // size: number
    // type: string
    // thumbnails: {
    //   small: {
    //     url: string
    //     width: number
    //     height: number
    //   }
    //   large: {
    //     url: string
    //     width: number
    //     height: number
    //   }
    //   full: {
    //     url: string
    //     width: number
    //     height: number
    //   }
  }[]
  createdBy: {
    id: string
    email: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

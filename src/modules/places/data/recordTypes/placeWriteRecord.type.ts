import { Point } from '../../../shared/types/mongoDb.types.js'

export type PlaceWriteRecord = {
  _id: string
  point: Point
  name: string
  shortSummary: string
  categories: string[]
  open24Hours?: boolean
  openingTime?: number
  closingTime?: number
  rating?: number
  ticketPrice?: number
  priceRange?: string
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
    // }
  }[]
  createdBy: {
    id: string
    email: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

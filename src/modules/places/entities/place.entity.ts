import { Coordinates } from '../../shared/types/Coordinates.type.js'

export type PlaceEntity = {
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
    id: string
    cloudinary: {
      id: string
      url: string
    }
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
    url: string
    filename: string
  }[]
  createdBy: {
    id: string
    email: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

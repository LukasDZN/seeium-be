import { z } from 'zod'
import { Coordinates } from '../../../shared/types/Coordinates.type.js'
import { GetPlaceRequestSchema } from './getPlaces.validator.js'

export type GetPlaceRequestDto = z.infer<typeof GetPlaceRequestSchema>

export type GetPlaceResponseDto = {
  places: Place[]
}

type Place = {
  id: string
  distanceToPlaceInMeters: number
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
  // createdBy: {
  //   id: string
  //   email: string
  //   name: string
  // }
  // createdAt: Date
  // updatedAt: Date
}

// More sophisticated version of the above:
// export type GetPlaceResponseDto = {
//   places: Place[]
// }

// export type Place = {
//   name: {
//     en: {
//       full: string
//     }
//   }
//   categories: string[]
//   location: {
//     distance: {
//       meters: number
//     }
//     coordinates: Coordinates
//     country: string
//     city: string
//     address: string
//   }
//   price: {
//     isFree: boolean
//   }

//   rating: {
//     value: number
//     count: number
//   }
//   photos: [
//     {
//       url: string
//     },
//   ]
// }

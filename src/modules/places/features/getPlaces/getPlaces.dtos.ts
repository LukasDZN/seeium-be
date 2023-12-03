import { z } from 'zod'
import { Coordinates } from '../../../shared/types/Coordinates.type.js'
import { GetPlacesRequestSchema } from './getPlaces.validator.js'

export type GetPlacesRequestDto = z.infer<typeof GetPlacesRequestSchema>

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
    cloudinary: {
      url: string
    }
  }[]
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

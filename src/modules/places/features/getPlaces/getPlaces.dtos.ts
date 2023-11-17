import { PlaceEntity } from '#modules/places/entities/place.entity.js'
import { z } from 'zod'
import { GetPlaceRequestSchema } from './getPlaces.validator.js'

export type GetPlaceRequestDto = z.infer<typeof GetPlaceRequestSchema>

export type GetPlaceResponseDto = {
  places: PlaceEntity[]
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

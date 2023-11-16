import { z } from 'zod'
import { GetPlaceRequestSchema } from './getPlaces.validator.js'
import { Coordinates } from '#modules/shared/types/Coordinates.type.js'

export type GetPlaceRequestDto = z.infer<typeof GetPlaceRequestSchema>

export type GetPlaceResponseDto = {
  places: Place[]
}

export type Place = {
  name: {
    en: {
      full: string
    }
  }
  categories: string[]
  location: {
    distance: {
      meters: number
    }
    coordinates: Coordinates
    country: string
    city: string
    address: string
  }
  price: {
    isFree: boolean
  }
  
  rating: {
    value: number
    count: number
  }
  photos: [
    {
      url: string
    }
  ]
  
}

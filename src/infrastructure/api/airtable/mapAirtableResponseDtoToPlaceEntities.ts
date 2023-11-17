import { PlaceEntity } from '#modules/places/entities/place.entity.js'
import { Coordinates } from '#modules/shared/types/Coordinates.type.js'
import { AirtablePlaceRecordResponseDto } from './airtableResponse.dto.js'

const parseCoordinatesFromString = (coordinateString: string): Coordinates => {
  const [latitude, longitude] = coordinateString.split(', ').map(Number)

  if (!latitude || !longitude) {
    throw new Error('Invalid Coordinates')
  }

  return { latitude, longitude }
}

export const mapAirtableResponseToPlaceEntities = ({
  airtablePlaceRecordResponse,
}: {
  airtablePlaceRecordResponse: AirtablePlaceRecordResponseDto[]
}): PlaceEntity[] => {
  const placeEntities = airtablePlaceRecordResponse.map((place) => {
    return {
      name: place.fields.Name,
      shortSummary: place.fields['Short summary'],
      categories: place.fields.Categories,
      openingTime: place.fields['Opening Time'],
      closingTime: place.fields['Closing Time'],
      coordinates: parseCoordinatesFromString(place.fields.Coordinates),
      rating: place.fields.Rating,
      ticketPrice: place.fields['Ticket Price (Optional)'],
      images: place.fields.Images.map((image) => ({
        id: image.id,
        width: image.width,
        height: image.height,
        url: image.url,
        filename: image.filename,
        size: image.size,
        type: image.type,
        thumbnails: {
          small: image.thumbnails.small,
          large: image.thumbnails.large,
          full: image.thumbnails.full,
        },
      })),
      createdBy: {
        id: place.fields['Created By'].id,
        email: place.fields['Created By'].email,
        name: place.fields['Created By'].name,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return placeEntities
}

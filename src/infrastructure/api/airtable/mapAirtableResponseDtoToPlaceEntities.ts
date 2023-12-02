import { PlaceEntity } from '../../../modules/places/entities/place.entity.js'
import { Coordinates } from '../../../modules/shared/types/Coordinates.type.js'
import { sharedUtils } from '../../../modules/shared/utils/shared.utils.js'
import { externalApis } from '../externalApis.js'
import { AirtablePlaceRecordResponseDto } from './airtableResponse.dto.js'

const parseCoordinatesFromString = (coordinateString: string): Coordinates => {
  const [latitude, longitude] = coordinateString.split(', ').map(Number)

  if (!latitude || !longitude) {
    throw new Error('Invalid Coordinates')
  }

  return { latitude, longitude }
}

export const mapAirtableResponseToPlaceEntities = async ({
  airtablePlaceRecordResponse,
}: {
  airtablePlaceRecordResponse: AirtablePlaceRecordResponseDto[]
}): Promise<PlaceEntity[]> => {
  const placeEntities: PlaceEntity[] = await Promise.all(
    airtablePlaceRecordResponse.map(async (place) => {
      const images = await Promise.all(
        place.fields.Images.map(async (airtableImage) => {
          const uploadedImageUrl =
            await externalApis.uploadImageUrlToCloudinary({
              imageId: airtableImage.id,
              imageUrl: airtableImage.url,
              folder: 'seeium-places-images-folder-1',
              uploadPreset: 'seeium-places-images-preset-1',
            })

          const image = {
            id: airtableImage.id,
            cloudinary: {
              id: airtableImage.id,
              url: uploadedImageUrl.secure_url,
            },
            url: airtableImage.url,
            filename: airtableImage.filename,
            // width: airtableImage.width,
            // height: airtableImage.height,
            // size: airtableImage.size,
            // type: airtableImage.type,
            // thumbnails: {
            //   small: airtableImage.thumbnails.small,
            //   large: airtableImage.thumbnails.large,
            //   full: airtableImage.thumbnails.full,
            // },
          }

          return image
        })
      )

      const placeEntity: PlaceEntity = {
        id: sharedUtils.generateObjectIdString(),
        name: place.fields.Name,
        shortSummary: place.fields['Short summary'],
        categories: place.fields.Categories,
        open24Hours: place.fields['Open 24 Hours'],
        openingTime: place.fields['Opening Time'],
        closingTime: place.fields['Closing Time'],
        coordinates: parseCoordinatesFromString(place.fields.Coordinates),
        rating: place.fields.Rating,
        ticketPrice: place.fields['Ticket Price (Optional)'],
        priceRange: place.fields['Price Range ($-$$)'],
        images: await Promise.all(images),
        createdBy: {
          id: place.fields['Created By'].id,
          email: place.fields['Created By'].email,
          name: place.fields['Created By'].name,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return placeEntity
    })
  )

  return placeEntities
}

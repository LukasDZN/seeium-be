import { z } from 'zod'

const thumbnailSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

const imageSchema = z.object({
  id: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string().url(),
  filename: z.string(),
  size: z.number(),
  type: z.string(),
  thumbnails: z.object({
    small: thumbnailSchema,
    large: thumbnailSchema,
    full: thumbnailSchema,
  }),
})

const createdBySchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

export const AirtableResponseDtoSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  fields: z.object({
    Name: z.string(),
    'Short summary': z.string(),
    Categories: z.array(z.string()),
    'Opening Time': z.number(),
    'Closing Time': z.number(),
    Coordinates: z.string().refine(
      (value) => {
        const [latitude, longitude] = value.split(', ')
        return (
          Number(latitude) >= -90 &&
          Number(latitude) <= 90 &&
          Number(longitude) >= -180 &&
          Number(longitude) <= 180
        )
      },
      {
        message: `Invalid Coordinates`,
      }
    ),
    'Ticket Price (Optional)': z.number().optional(),
    Rating: z.number(),
    Images: z.array(imageSchema),
    'Created By': createdBySchema,
  }),
})

export const validateAirtableResponseDto = ({
  airtableResponseDto,
}: {
  airtableResponseDto: unknown
}) => {
  return AirtableResponseDtoSchema.parse(airtableResponseDto)
}

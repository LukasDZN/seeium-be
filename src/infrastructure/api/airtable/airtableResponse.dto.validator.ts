import { z } from 'zod'

// const thumbnailSchema = z.object({
//   url: z.string(),
//   width: z.number(),
//   height: z.number(),
// })

const imageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  filename: z.string(),
  // width: z.number(),
  // height: z.number(),
  // size: z.number(),
  // type: z.string(),
  // thumbnails: z.object({
  //   small: thumbnailSchema,
  //   large: thumbnailSchema,
  //   full: thumbnailSchema,
  // }),
})

const createdBySchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
})

export const AirtableResponseDtoSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  fields: z
    .object({
      Name: z.string(),
      'Short summary': z.string(),
      Categories: z.array(z.string()),
      'Open 24 Hours': z.boolean().optional(),
      'Opening Time': z.number().optional(),
      'Closing Time': z.number().optional(),
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
      'Price Range ($-$$)': z.string().optional(), // '$', '$$', '$$$', '$$$$' & '€', '€€'...
      Rating: z.number().optional(),
      Images: z.array(imageSchema),
      'Created By': createdBySchema,
    })
    .strict(), // ! No extra fields allowed
})

export const validateAirtableResponseDto = ({
  airtableResponseDto,
}: {
  airtableResponseDto: unknown
}) => {
  return AirtableResponseDtoSchema.parse(airtableResponseDto)
}

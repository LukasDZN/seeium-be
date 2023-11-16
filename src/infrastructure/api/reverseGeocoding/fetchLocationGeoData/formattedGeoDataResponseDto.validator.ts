import { z } from 'zod'

// const adminCodeSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   asciiName: z.string(),
//   geoNameId: z.string(),
// })

const locationSchema = z.object({
  // geoNameId: z.string(),
  // name: z.string(),
  asciiName: z.string(),
  // alternateNames: z.string(),
  // latitude: z.string(),
  // longitude: z.string(),
  // featureClass: z.string(),
  // featureCode: z.string(),
  countryCode: z.string(),
  // countryName: z.string(),
  // cc2: z.union([z.string(), z.null()]),
  // adminCodes: z.array(adminCodeSchema),
  // population: z.string(),
  // elevation: z.union([z.string(), z.null()]),
  // dem: z.string(),
  // timezone: z.string(),
  // modificationDate: z.string(),
  // distanceInKilometers: z.number(),
})

export const formattedGeoDataResponseDtoSchema = z.object({
  geoData: locationSchema,
})

import { airtableApiAdapter } from './airtable/airtableApi.adapter.js'
import { uploadImageUrlToCloudinary } from './cloudinary/cloudinaryApi.adapter.js'
import { reverseGeocoderApiAdapter } from './reverseGeocoding/reverseGeocodingApi.adapter.js'
import { slackApiAdapter } from './slack/slackApi.adapter.js'

export const externalApis = {
  reverseGeocoderApiAdapter,
  airtableApiAdapter,
  slackApiAdapter,
  uploadImageUrlToCloudinary,
} as const

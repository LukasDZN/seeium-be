import mongoose from 'mongoose'
import { PointSchema } from '../../shared/shared.models.js'

const ThumbnailSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false }
)

const ImageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    cloudinary: {
      type: {
        id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    // width: { type: Number, required: true },
    // height: { type: Number, required: true },
    // size: { type: Number, required: true },
    // type: { type: String, required: true },
    // thumbnails: {
    //   type: {
    //     small: { type: ThumbnailSchema, required: true },
    //     large: { type: ThumbnailSchema, required: true },
    //     full: { type: ThumbnailSchema, required: true },
    //   },
    //   required: true,
    // },
  },
  { _id: false }
)

const CreatedBySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
)

export const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortSummary: { type: String, required: true },
  categories: [{ type: String, required: true }],
  open24Hours: { type: Boolean, required: false }, // ! optional
  openingTime: { type: Number, required: false }, // ! optional
  closingTime: { type: Number, required: false }, // ! optional
  point: { type: PointSchema, required: true },
  ticketPrice: { type: Number, required: false }, // ! optional
  priceRange: { type: String, required: false }, // ! optional
  rating: { type: Number, required: false }, // ! optional
  images: { type: [ImageSchema], required: true },
  createdBy: { type: CreatedBySchema, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

// GeoSpatial index

PlaceSchema.index({
  point: '2dsphere',
})

// Fuzzy search index

// Note: You can create an Atlas Search index using the Atlas UI , Atlas Search API , or Atlas CLI.

// This is JSON format index to be used in Atlas UI

// {
//   "placesSearch": {
//     "dynamic": false,
//     "fields": {
//       "name.en.full": [
//         {
//           "analyzer": "lucene.standard",
//           "foldDiacritics": true,
//           "maxGrams": 7,
//           "minGrams": 3,
//           "tokenization": "edgeGram",
//           "type": "autocomplete"
//         }
//       ],
//     }
//   }
// }

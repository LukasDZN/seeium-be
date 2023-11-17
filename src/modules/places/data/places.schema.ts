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
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    thumbnails: {
      type: {
        small: { type: ThumbnailSchema, required: true },
        large: { type: ThumbnailSchema, required: true },
        full: { type: ThumbnailSchema, required: true },
      },
      required: true,
    },
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
  openingTime: { type: Number, required: true },
  closingTime: { type: Number, required: true },
  point: { type: PointSchema, required: true },
  ticketPrice: { type: Number, required: false }, // ! optional
  rating: { type: Number, required: true },
  images: { type: [ImageSchema], required: true },
  createdBy: { type: CreatedBySchema, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

import mongoose from 'mongoose'
import { PointSchema } from '../../shared/shared.models.js'

export const PlaceSchema = new mongoose.Schema({
  dataType: {
    type: String,
    required: true,
    // enum: ['Feature'],
  },
  properties: {
    required: true,
    type: {
      quadrantKey: {
        type: String,
        required: true,
      },
    },
  },
  point: {
    type: PointSchema,
    required: true,
    index: '2dsphere',
  },
})



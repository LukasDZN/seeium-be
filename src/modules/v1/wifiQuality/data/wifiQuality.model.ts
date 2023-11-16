import mongoose from 'mongoose'
import { PointSchema } from '../../shared/shared.models.js'

const WifiQualitySchema = new mongoose.Schema({
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
      averageDownloadKbps: {
        type: Number,
        required: true,
      },
      averageUploadKbps: {
        type: Number,
        required: true,
      },
      averageLatencyMs: {
        type: Number,
        required: true,
      },
      testRunCount: {
        type: Number,
        required: true,
      },
      uniqueDevicesCount: {
        type: Number,
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

WifiQualitySchema.index({
  point: '2dsphere',
})

export const WifiQualityModel = mongoose.model(
  'wifi_quality_locations',
  WifiQualitySchema
)

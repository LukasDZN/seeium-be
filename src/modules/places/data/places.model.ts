import mongoose from 'mongoose'
import { PlaceSchema } from './places.schema.js'

export const PlaceModel = mongoose.model('places', PlaceSchema)

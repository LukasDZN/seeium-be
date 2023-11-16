import mongoose from 'mongoose'
import 'places.indexes.js'
import { PlaceSchema } from './places.schema.js'

export const PlaceModel = mongoose.model('places', PlaceSchema)

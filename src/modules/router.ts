import express, { Router } from 'express'
import { getPlaces } from '#modules/places/features/getPlaces/getPlaces.router.js'

export const router: Router = express.Router()

router.use('/', getPlaces)

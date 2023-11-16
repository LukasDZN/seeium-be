import express, { Router } from 'express'
import { getPlaces } from '#modules/wifiQuality/features/getWifiQuality/getWifiQuality.router.js'

export const router: Router = express.Router()

router.use('/', getPlaces)

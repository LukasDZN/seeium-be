import express, { Router } from 'express'
import { expressCallbackWrapper } from '../../../shared/utils/wrappers/expressCallback.wrapper.js'
import { getWifiQualityController } from './getWifiQuality.controller.js'

export const getPlaces: Router = express.Router()

getPlaces.get('/wifiQuality', expressCallbackWrapper(getWifiQualityController))

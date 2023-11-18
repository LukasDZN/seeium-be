import express, { Router } from 'express'
import { expressCallbackWrapper } from '../../../shared/utils/wrappers/expressCallback.wrapper.js'
import { getPlaceController } from './getPlaces.controller.js'

export const getPlaces: Router = express.Router()

getPlaces.get('', expressCallbackWrapper(getPlaceController))

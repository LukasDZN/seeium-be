import Airtable from 'airtable'
import { envVariables } from '../../../config/envVariables.js'

Airtable.configure({ apiKey: envVariables.AIRTABLE_API_KEY }) // token name: lukas-backend-token-1

export const airtable = new Airtable()

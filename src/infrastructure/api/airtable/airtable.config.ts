import { envVariables } from '#config/envVariables.js'
import Airtable from 'airtable'

Airtable.configure({ apiKey: envVariables.AIRTABLE_API_KEY }) // token name: lukas-backend-token-1

export const airtable = new Airtable()

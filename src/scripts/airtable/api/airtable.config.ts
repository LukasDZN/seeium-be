import { envVariables } from '#config/envVariables.js'
import Airtable from 'airtable'

Airtable.configure({ apiKey: envVariables.AIRTABLE_API_KEY }) // token name: lukas-backend-token-1
Airtable.base('appIhY7CH9fAaSkIY')

export const airtable = new Airtable()

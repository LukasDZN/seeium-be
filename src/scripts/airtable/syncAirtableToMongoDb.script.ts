import { envVariables } from '../../config/envVariables.js'
import { syncAirtableToMongoDb } from './syncAirtableToMongoDb.util.js'

console.log(`🚀 Starting ${syncAirtableToMongoDb.name} script...`)

await syncAirtableToMongoDb({
  syncTriggerSource: 'By running the script manually',
})

console.log(
  `✅ ${syncAirtableToMongoDb.name} script completed! Environment: '${envVariables.APP_ENV}'!`
)

process.exit(0)

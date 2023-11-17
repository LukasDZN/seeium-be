import { envVariables } from '#config/envVariables.js'
import { connectToDb } from '#config/mongodb.js'
import { airtableConstants } from '#infrastructure/api/airtable/airtable.constants.js'
import { externalApis } from '#infrastructure/api/externalApis.js'
import { placesMapper } from '#modules/places/data/mapper/places.mapper.js'
import { PlaceModel } from '#modules/places/data/places.model.js'
import { airtableLogger } from '../../../src/app.js'

const syncAirtableToMongoDbScript = async () => {
  await connectToDb()

  const placeEntities =
    await externalApis.airtableApiAdapter.fetchRecordsFromTable({
      tableIdOrName: airtableConstants.places.TABLE_ID,
    })

  if (!placeEntities.length) {
    throw new Error('No records retrieved from Airtable')
  }

  await PlaceModel.deleteMany({})

  for (const placeEntity of placeEntities) {
    const placeWriteRecord = placesMapper.mapPlaceEntityToWriteRecord({
      placeEntity,
    })

    await PlaceModel.create(placeWriteRecord)

    console.log(`✅ ${placeWriteRecord.name} created!`)
  }

  airtableLogger.info({
    message: `✅ successfully synced Airtable to MongoDB!`,
    meta: {
      createdAt: new Date(),
      placesCount: placeEntities.length,
      scriptName: syncAirtableToMongoDbScript.name,
      environment: envVariables.APP_ENV,
    },
  })
}

console.log(`🚀 Starting ${syncAirtableToMongoDbScript.name} script...`)

await syncAirtableToMongoDbScript()

console.log(
  `✅ ${syncAirtableToMongoDbScript.name} script completed! Environment: '${envVariables.APP_ENV}'!`
)

process.exit(0)

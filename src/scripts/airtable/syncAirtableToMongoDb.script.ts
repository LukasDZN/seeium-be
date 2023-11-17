import { envVariables } from '#config/envVariables.js'
import { connectToDb } from '#config/mongodb.js'
import { airtableConstants } from '#infrastructure/api/airtable/airtable.constants.js'
import { externalApis } from '#infrastructure/api/externalApis.js'
import { placesMapper } from '#modules/places/data/mapper/places.mapper.js'
import { PlaceModel } from '#modules/places/data/places.model.js'

const syncAirtableToMongoDbScript = async () => {
  await connectToDb()

  const airtableRecords =
    await externalApis.airtableApiAdapter.fetchRecordsFromTable({
      tableIdOrName: airtableConstants.places.TABLE_ID,
    })

  if (!airtableRecords.length) {
    throw new Error('No records retrieved from Airtable')
  }

  await PlaceModel.deleteMany({})

  const placeWriteRecords = airtableRecords.map((airtableRecord) => {
    return placesMapper.mapPlaceEntityToWriteRecord({ placeEntity })
  }

  // await placesRepository.createPlaceReadRecord({ placeWriteRecord })

  // console.log(`✅ ${placeWriteRecord.name} created!`)
}

console.log(`🚀 Starting ${syncAirtableToMongoDbScript.name} script...`)

await syncAirtableToMongoDbScript()

console.log(
  `✅ ${syncAirtableToMongoDbScript.name} script completed! Environment: '${envVariables.APP_ENV}'!`
)

process.exit(0)

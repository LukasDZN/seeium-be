import Airtable from 'airtable'
import { envVariables } from '#config/envVariables.js'
import { makePlaceEntity } from '#modules/places/entities/place.entity.js'
import { placesMapper } from '#modules/places/data/mapper/places.mapper.js'
import { placesRepository } from '#modules/places/data/repository/places.repository.js'
import { connectToDb } from '#config/mongodb.js'
import { PlaceModel } from '#modules/places/data/places.model.js'

/**
 * TODO:
 * - Fetch data from airtable
 * - For each result, create a place document
 */



const syncAirtableToMongoDb = async () => {
  await connectToDb()

  await PlaceModel.deleteMany({})

  // airtable.

  const placeEntity = makePlaceEntity({})

  const placeWriteRecord = placesMapper.mapPlaceEntityToWriteRecord({ placeEntity })

  await placesRepository.createPlaceReadRecord({ placeWriteRecord })

  console.log(`✅ ${placeWriteRecord.name} created!`)
}

console.log(`🚀 Starting ${syncAirtableToMongoDb.name} script...`)

await syncAirtableToMongoDb()

console.log(
  `✅ ${syncAirtableToMongoDb.name} script completed! Environment: '${envVariables.APP_ENV}'!`
)

process.exit(0)
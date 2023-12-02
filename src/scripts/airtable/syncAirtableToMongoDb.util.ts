import { envVariables } from '../../config/envVariables.js'
import { connectToDb } from '../../config/mongodb.js'
import { airtableConstants } from '../../infrastructure/api/airtable/airtable.constants.js'
import { externalApis } from '../../infrastructure/api/externalApis.js'
import { placesMapper } from '../../modules/places/data/mapper/places.mapper.js'
import { PlaceModel } from '../../modules/places/data/places.model.js'
import { airtableLogger } from '../../server.js'

export const syncAirtableToMongoDb = async ({
  syncTriggerSource,
}: {
  syncTriggerSource?: string
}) => {
  await connectToDb()

  const placeEntities =
    await externalApis.airtableApiAdapter.fetchRecordsFromTable({
      tableIdOrName: airtableConstants.places.TABLE_ID,
      viewId: airtableConstants.places.VIEW_ID,
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

  const resultLog = {
    message: `✅ successfully synced Airtable to MongoDB!`,
    meta: {
      syncTriggerSource,
      createdAt: new Date(),
      placesCount: placeEntities.length,
      scriptName: syncAirtableToMongoDb.name,
      environment: envVariables.APP_ENV,
    },
  }

  airtableLogger.info(resultLog)

  return resultLog
}

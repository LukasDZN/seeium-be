import { logger } from '../../../../app.js'
import { PlaceModel } from '../places.model.js'
import { PlaceReadRecord } from '../recordTypes/placeReadRecord.type.js'
import { PlaceWriteRecord } from '../recordTypes/placeWriteRecord.type.js'

export const savePlaceReadRecord = async ({
  placesWriteRecord,
}: {
  placesWriteRecord: PlaceWriteRecord
}): Promise<PlaceReadRecord> => {
  const createdPlaceReadRecord: PlaceReadRecord =
    await PlaceModel.create(placesWriteRecord)

  if (createdPlaceReadRecord) {
    logger.debug(`✅ Place document created`)
  } else {
    logger.debug(`❌ Place document not created`)
  }

  return createdPlaceReadRecord
}

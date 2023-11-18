import { generalLogger } from '../../../../server.js'
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
    generalLogger.debug(`✅ Place document created`)
  } else {
    generalLogger.debug(`❌ Place document not created`)
  }

  return createdPlaceReadRecord
}

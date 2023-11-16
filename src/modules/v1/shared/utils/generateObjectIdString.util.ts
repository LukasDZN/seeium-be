import { sharedUtils } from './shared.utils.js'

export const generateObjectIdString = (): string => {
  const objectId = sharedUtils.generateObjectId()

  return objectId.toString()
}

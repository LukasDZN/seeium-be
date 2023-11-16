import { MongoDbBaseError } from './mongoDbBase.error.js'
import { MONGO_DB_ERROR_CODES } from './mongoDb.error.codes.js'

export class DuplicateKeyError extends MongoDbBaseError {
  readonly code = MONGO_DB_ERROR_CODES.DUPLICATE_KEY
}

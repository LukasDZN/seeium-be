import { mongoDbErrors } from './mongodb/mongoDb.errors.js'

export const databaseErrors = {
  mongoDb: mongoDbErrors,
} as const

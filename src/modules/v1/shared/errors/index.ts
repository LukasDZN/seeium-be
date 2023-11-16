import { apiErrors } from './api/api.errors.js'
import { databaseErrors } from './database/database.errors.js'

export const sharedErrors = {
  database: databaseErrors,
  api: apiErrors,
} as const

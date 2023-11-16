import dotenv from 'dotenv'
import path from 'path'
import { z } from 'zod'

let envFileName

if (process.env.APP_ENV === 'production') {
  envFileName = '.env.production'
} else if (process.env.APP_ENV === 'staging') {
  envFileName = '.env.staging'
} else if (process.env.APP_ENV === 'test') {
  envFileName = '.env.test'
} else if (process.env.APP_ENV === 'development') {
  envFileName = '.env.development'
} else {
  throw new Error(
    `Invalid APP_ENV: ${process.env.APP_ENV}. Must be one of: production, staging, test, development`
  )
}

const fullEnvPath = path.resolve(process.cwd(), envFileName)

dotenv.config({ path: fullEnvPath })

const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['production', 'development']),
  APP_ENV: z.enum(['production', 'staging', 'test', 'development']),
  PORT: z.coerce.number().int().positive(),
  DEBUG: z.coerce.boolean().optional(),
  ERROR_LOG_LEVEL: z.enum(['error', 'warn', 'info']),
  REQ_RES_LOG_LEVEL: z.enum(['error', 'warn', 'info']),
  SERVER_INSTANCE_ID: z.string(),

  MONGO_DB_URL: z.string().url(),

  REDIS_URL: z.string(),

  REVERSE_GEOCODING_API_URL: z.string().url(),

  TYPESENSE_URL: z.string().optional(),
  TYPESENSE_API_KEY: z.string().optional(),
  TYPESENSE_SEARCH_ONLY_API_KEY: z.string().optional(),
})

export const envVariables = envVariablesSchema.parse(process.env)

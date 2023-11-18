import chalk from 'chalk'
import mongoose from 'mongoose'
import { envVariables } from './envVariables.js'

// Log mongoose actions
if (envVariables.NODE_ENV !== 'production' && envVariables.DEBUG === true) {
  mongoose.set('debug', true)
}

export const connectToDb = async () => {
  let reconnectionCount = 1
  let reconnectionDelay = 3000

  // Initialize mongoose event listeners

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected ${chalk.green('successfully')}!`)
  })

  // Get notified about DB disconnects
  // Note: disconnected event can be emitted multiple times
  mongoose.connection.on('disconnected', () => {
    if (reconnectionCount < 20) {
      console.log(
        `MongoDB ${chalk.red(
          'disconnected'
        )}! Time: '${new Date()}'. Attempting to reconnect... Attempt number: '${reconnectionCount}', reconnection delay used: '${reconnectionDelay}ms'`
      )

      // Reconnect to DB after a delay
      setTimeout(() => {
        {
          attemptConnectionToDb(envVariables.MONGO_DB_URL)
        }
      }, reconnectionDelay)

      reconnectionCount++
      reconnectionDelay += 2000

      return
    }

    throw new Error('Reconnection attempts exceeded')
  })

  mongoose.connection.on('error', (error) => {
    console.log(`MongoDB ${chalk.red('connection error')}: ${error}`)
  })

  const dbConnection = await attemptConnectionToDb(envVariables.MONGO_DB_URL)

  return dbConnection
}

const attemptConnectionToDb = async (mongoDbRatingDbUrl: string) => {
  if (!mongoDbRatingDbUrl) {
    throw new Error('MONGO_DB_URL is not defined')
  }

  await mongoose.connect(mongoDbRatingDbUrl, {
    maxPoolSize: 20,
  })

  // Get MongoDB native driver connection
  const dbConnection = mongoose.connection.getClient()

  return dbConnection
}

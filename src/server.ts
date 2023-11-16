import chalk from 'chalk'
import { app } from './app.js'
import { envVariables } from './config/envVariables.js'
import { connectToDb } from './config/mongodb.js'

const runServer = async () => {
  try {
    console.info('Starting NodeJS server...')

    // Connect to MongoDB
    await connectToDb()

    // Connect to Redis
    // redisClient

    app.listen(envVariables.PORT, () => {
      console.log(
        `NodeJS is ${chalk.cyan('running')} in ${chalk.cyan(
          envVariables.NODE_ENV
        )} environment, on port ${chalk.cyan(envVariables.PORT)}!`
      )
    })
  } catch (error) {
    console.log(
      `${chalk.bgRed('Error')} when starting the NodeJS server: ` + error
    )
  }
}

runServer()

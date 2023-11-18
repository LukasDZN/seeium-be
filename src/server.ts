import chalk from 'chalk'
import { makeApp } from './app.js'
import { envVariables } from './config/envVariables.js'
import { connectToDb } from './config/mongodb.js'
import { makeWinstonLogger } from './loggers/makeWinston.logger.js'

// Connect to MongoDB
await connectToDb()

// Initialize global variables which require MongoDB connection
export const generalLogger = makeWinstonLogger({ collectionName: 'error_logs' })
export const airtableLogger = makeWinstonLogger({
  collectionName: 'airtable_logs',
})
export const slackLogger = makeWinstonLogger({ collectionName: 'slack_logs' })

const runServer = async () => {
  try {
    console.info('Starting NodeJS server...')

    const app = makeApp()

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

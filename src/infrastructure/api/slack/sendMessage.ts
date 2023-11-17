import { envVariables } from '#config/envVariables.js'
import { WebClient } from '@slack/web-api'
import { slackLogger } from '../../../app.js'

const token = envVariables.SLACK_TOKEN // bot user's OAuth access token
const slackClient = new WebClient(token)

const lukasSlackChannelId = 'C065X4RHRB9'

export const sendMessage = async ({
  channel = lukasSlackChannelId,
  message,
}: {
  channel?: string
  message: string
}) => {
  if (envVariables.APP_ENV !== 'production') {
    console.log(
      `🚀 Skipping sending Slack message in ${envVariables.APP_ENV} environment... Message ${message}`
    )

    return
  }

  try {
    // Use the chat.postMessage method to send a message
    const result = await slackClient.chat.postMessage({
      channel: channel,
      text: message,
    })

    slackLogger.info(result)
  } catch (error) {
    slackLogger.error(error)
  }
}

import { WebClient } from '@slack/web-api'
import { slackLogger } from '../../../server.js'
import { envVariables } from '../../../config/envVariables.js'

const token = envVariables.SLACK_TOKEN // bot user's OAuth access token
const slackClient = new WebClient(token)

const lukasSlackChannelId = 'C065X4RHRB9'
const lukasUserId = 'U02MWJB4CES'

export const sendMessage = async ({
  channel = lukasSlackChannelId,
  message,
}: {
  channel?: string
  message: string
}) => {
  try {
    // Use the chat.postMessage method to send a message
    const result = await slackClient.chat.postMessage({
      channel: channel,
      text: `<@${lukasUserId}>\n${message}`,
    })

    slackLogger.debug(`Slack message result: ${result.ok}`)
  } catch (error) {
    slackLogger.error(error)
  }
}

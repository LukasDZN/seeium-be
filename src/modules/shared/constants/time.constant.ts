const ONE_HOUR_IN_SECONDS = 60 * 60

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30
const ONE_MONTH_IN_MILLISECONDS = ONE_MONTH_IN_SECONDS * 1000

const THREE_MONTHS_IN_SECONDS = ONE_MONTH_IN_SECONDS * 3
const THREE_MONTHS_IN_MILLISECONDS = ONE_MONTH_IN_MILLISECONDS * 3

const SIX_MONTHS_IN_SECONDS = ONE_MONTH_IN_SECONDS * 6
const SIX_MONTHS_IN_MILLISECONDS = ONE_MONTH_IN_MILLISECONDS * 6

const getOneMonthAgoDate = () => {
  return new Date(Date.now() - ONE_MONTH_IN_MILLISECONDS)
}

const getThreeMonthsAgoDate = () => {
  return new Date(Date.now() - THREE_MONTHS_IN_MILLISECONDS)
}

const getSixMonthsAgoDate = () => {
  return new Date(Date.now() - SIX_MONTHS_IN_MILLISECONDS)
}

export const time = {
  ONE_HOUR_IN_SECONDS,

  THREE_MONTHS_IN_SECONDS,
  THREE_MONTHS_IN_MILLISECONDS,
  SIX_MONTHS_IN_SECONDS,
  SIX_MONTHS_IN_MILLISECONDS,

  getOneMonthAgoDate,
  getThreeMonthsAgoDate,
  getSixMonthsAgoDate,
} as const

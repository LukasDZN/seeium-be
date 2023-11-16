/**
 * Given an array of arrays with two numbers, calculates
 * the weighted average of the given numbers.
 */
export const calculateWeightedAverage = (data: number[][]): number => {
  if (
    !data.every((item) => {
      return typeof item[0] === 'number' && typeof item[1] === 'number'
    })
  ) {
    throw new Error('Input must be an array of 2 arrays of numbers')
  }
  if (data.length === 0) {
    throw new Error('Input array must not be empty')
  }

  let totalWeight = 0
  let totalRating = 0

  for (const item of data) {
    const value = item[0]
    const count = item[1]

    if ((!value && value !== 0) || (!count && count !== 0)) {
      throw new Error('Values of value and count must not be undefined')
    }

    if (value < 0 || count < 0) {
      throw new Error('Values of value and count must not be negative')
    }

    totalRating += value * count
    totalWeight += count
  }

  if (totalWeight === 0) {
    // If the providers have no ratings, return 0
    return 0 // to avoid division by zero
  }

  return totalRating / totalWeight
}

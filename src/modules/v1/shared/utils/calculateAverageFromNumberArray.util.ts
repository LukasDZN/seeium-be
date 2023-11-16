// import '@total-typescript/ts-reset'

export const calculateAverageFromNumberArray = (
  numbers: (number | null)[]
): number | null => {
  const numbersWithoutNull = numbers.filter((number) => {
    return number !== null
  }) as number[]

  if (numbersWithoutNull.length === 0) {
    return null
  }

  const sum = numbersWithoutNull.reduce((a, b) => {
    return a + b
  }, 0)

  if (sum === null) {
    return null
  }

  const average = sum / numbersWithoutNull.length

  return average
}

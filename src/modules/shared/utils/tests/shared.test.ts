import { describe, expect, test } from 'vitest'
import { sharedUtils } from '../shared.utils.js'

// Utils tests

test('removeAllWordInstancesFromString', () => {
  const mainString = 'the quick BROWN fox jumps over the lazy dog. 11 @    '
  const removeString = 'the'
  const expectedOutput = 'quick BROWN fox jumps over lazy dog. 11 @'

  expect(
    sharedUtils.removeWordInstancesFromString(mainString, removeString)
  ).toEqual(expectedOutput)
})

test('replaceMultipleWhiteSpacesWithSingle', () => {
  const inputString =
    'The   quick  @     brown   1fox   jumps   over   the   lazy   dog.     '
  const expectedOutput = 'The quick @ brown 1fox jumps over the lazy dog. '

  expect(sharedUtils.replaceMultipleWhiteSpacesWithSingle(inputString)).toEqual(
    expectedOutput
  )
})

describe('cleanRegularString', () => {
  test('removes special characters', () => {
    expect(sharedUtils.cleanRegularString('Hello, World!')).toBe('hello world')
    expect(
      sharedUtils.cleanRegularString(
        'This`-=~!@#$%^&*()_+{}|:;",<.>?/Įę is a @ $ % tes<>{|\\t string'
      )
    ).toBe('this_ie is a test string')
  })

  test('converts to lowercase', () => {
    expect(sharedUtils.cleanRegularString('HELLO, WORLD!')).toBe('hello world')
  })

  test('trims whitespace', () => {
    expect(sharedUtils.cleanRegularString('   This is a test string   ')).toBe(
      'this is a test string'
    )
  })

  test('removes multiple white spaces', () => {
    expect(sharedUtils.cleanRegularString('This is     a  test string')).toBe(
      'this is a test string'
    )
  })
})

describe('areCoordinatesWithinDistance', () => {
  // These coordinates are within ~1000 meters
  const lat1 = '52.2296756'
  const lon1 = '21.0122287'
  const lat2 = '52.230775'
  const lon2 = '21.0268004001'

  test('should return true when coordinates are within the specified distance', () => {
    expect(
      sharedUtils.areCoordinatesWithinDistance(lat1, lon1, lat2, lon2, 1050)
    ).toBe(true)
    expect(
      sharedUtils.areCoordinatesWithinDistance(lat1, lon1, lat2, lon2, 11209)
    ).toBe(true)
  })

  test('should return false when coordinates are not within the specified distance', () => {
    expect(
      sharedUtils.areCoordinatesWithinDistance(lat1, lon1, lat2, lon2, 950)
    ).toBe(false)
    expect(
      sharedUtils.areCoordinatesWithinDistance(lat1, lon1, lat2, lon2, 100)
    ).toBe(false)
  })
})

describe('calculateWeightedAverage', () => {
  test('should return the correct weighted average for a valid input', () => {
    const data = [
      [1, 2],
      [3, 4],
      [5, 5],
    ]
    expect(sharedUtils.calculateWeightedAverage(data)).toBeCloseTo(
      3.5454545454545454
    )
  })

  test('should return an error if the input is not an array of arrays of numbers', () => {
    const data = [
      [1, 2],
      [3, 'a'],
      [5, 6],
    ]
    expect(() => {
      // @ts-expect-error - because we want to test if function throws an error
      return sharedUtils.calculateWeightedAverage(data)
    }).toThrow('Input must be an array of 2 arrays of numbers')
  })

  test('should return an error if the input array is empty', () => {
    const data: number[][] = []
    // const result = calculateWeightedAverage(data)
    expect(() => {
      return sharedUtils.calculateWeightedAverage(data)
    }).toThrow('Input array must not be empty')
  })

  test('should return an error if any of the sub-arrays in the input array do not have exactly two elements', () => {
    const data = [[1, 2], [3], [5, 6]]
    expect(() => {
      return sharedUtils.calculateWeightedAverage(data)
    }).toThrow('Input must be an array of 2 arrays of numbers')
  })

  test('should return an error if any of the values in the input array are negative numbers', () => {
    const data = [
      [1, 2],
      [-3, 4],
      [5, 6],
    ]
    expect(() => {
      return sharedUtils.calculateWeightedAverage(data)
    }).toThrow('Values of value and count must not be negative')
  })

  test('should be okay with provider rating and count being 0 in case no reviews exist', () => {
    const data = [
      [0, 0],
      [3, 1],
    ]
    expect(sharedUtils.calculateWeightedAverage(data)).toBeCloseTo(3)
  })
})

describe('roundFloat', () => {
  test('should round a float to the specified precision', () => {
    expect(sharedUtils.roundFloat(9.35677666, 1)).toEqual(9.4)
    expect(sharedUtils.roundFloat(9.35677666, 2)).toEqual(9.36)
    expect(sharedUtils.roundFloat(9.35677666)).toEqual(9)
  })

  test('should throw an error when value is not a number', () => {
    expect(() => {
      // @ts-expect-error - because we want to test if function throws an error
      return sharedUtils.roundFloat('string', 2)
    }).toThrow('Value must be a number')
  })

  test('should throw an error when precision is not a number', () => {
    expect(() => {
      // @ts-expect-error - because we want to test if function throws an error
      return sharedUtils.roundFloat(9.35677666, 'string')
    }).toThrow('Precision must be a number')
  })

  test('should throw an error when precision is less than zero', () => {
    expect(() => {
      return sharedUtils.roundFloat(9.35677666, -1)
    }).toThrow('Precision must be a non-negative number')
  })
})

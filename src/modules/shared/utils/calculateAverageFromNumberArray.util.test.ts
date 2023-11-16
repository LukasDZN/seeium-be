import { describe, expect, it } from 'vitest'
import { calculateAverageFromNumberArray } from './calculateAverageFromNumberArray.util.js'

describe('calculateAverageFromNumberArray', () => {
  it('should return null for an empty array', () => {
    const result = calculateAverageFromNumberArray([])
    expect(result).toBeNull()
  })

  it('should return null for an array of only null values', () => {
    const result = calculateAverageFromNumberArray([null, null, null])
    expect(result).toBeNull()
  })

  it('should calculate average ignoring null values', () => {
    const result = calculateAverageFromNumberArray([1, 2, 3, null, 4, null])
    expect(result).toBe(2.5) // Average of 1, 2, 3, and 4
  })

  it('should calculate average for an array of only numbers', () => {
    const result = calculateAverageFromNumberArray([1, 2, 3, 4])
    expect(result).toBe(2.5)
  })

  it('should calculate average for an array with only one item', () => {
    const result = calculateAverageFromNumberArray([2])
    expect(result).toBe(2)
  })

  it('should calculate average for an array with only one null item', () => {
    const result = calculateAverageFromNumberArray([null])
    expect(result).toBeNull()
  })
})

import { z } from 'zod'

/**
 * Returns true if the coordinates are within the specified distance, false otherwise.
 */
export const areCoordinatesWithinDistance = (
  lat1: string | number,
  lon1: string | number,
  lat2: string | number,
  lon2: string | number,
  distance: number
): boolean => {
  // If coordinates are identical, return true immediately
  if (lat1 === lat2 && lon1 === lon2) {
    return true
  }

  const coordinateLatitudeNumericSchema = z.coerce.number().min(-90).max(90)
  const coordinateLongitudeNumericSchema = z.coerce.number().min(-180).max(180)

  lat1 = coordinateLatitudeNumericSchema.parse(lat1)
  lat2 = coordinateLatitudeNumericSchema.parse(lat2)
  lon1 = coordinateLongitudeNumericSchema.parse(lon1)
  lon2 = coordinateLongitudeNumericSchema.parse(lon2)

  if (lat1 === lat2 && lon1 === lon2) {
    return true
  }

  // Convert degrees to radians
  const lat1Radians = (lat1 * Math.PI) / 180
  const lon1Radians = (lon1 * Math.PI) / 180
  const lat2Radians = (lat2 * Math.PI) / 180
  const lon2Radians = (lon2 * Math.PI) / 180

  // Calculate the distance using the Haversine formula
  const dlat = lat2Radians - lat1Radians
  const dlon = lon2Radians - lon1Radians
  // a and c are intermediate calculation values that do not have specific names
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1Radians) *
      Math.cos(lat2Radians) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const calculatedDistance = 6371 * c * 1000 // Distance in meters (c ir circumference of the earth)

  // Check if the distance is within the specified range
  return calculatedDistance <= distance
}

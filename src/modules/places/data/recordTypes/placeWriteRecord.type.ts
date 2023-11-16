import { _Id } from '#modules/shared/types/mongoDb.types.js'

export type PlaceWriteRecord = {
  _id: _Id
  
  point: { type: string; coordinates: number[] } // ? Temporary workaround to Typescript bug. Type should be Point
}

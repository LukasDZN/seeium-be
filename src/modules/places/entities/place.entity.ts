export type PlaceEntity = ReturnType<typeof makePlaceEntity>

export type MakePlaceEntityInput = {
  properties: {
    uniqueDevicesCount: UniqueDevicesCount
  }
}

export const makePlaceEntity = ({ properties }: MakePlaceEntityInput) => {
  const placeEntity = {} as const

  return placeEntity
}

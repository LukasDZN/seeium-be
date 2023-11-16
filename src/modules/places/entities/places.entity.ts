import { PlaceEntity } from './place.entity.js'

export type PlacesEntity = ReturnType<typeof makePlacesEntity>

export const makePlacesEntity = ({ placeEntities }: {placeEntities: PlaceEntity[]}) => {
  return placeEntities
}
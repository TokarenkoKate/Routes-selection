export type RouteData = {
  id: number
  mapPoints: CoordinatesType | []
  wayPoints: CoordinatesType | []
}

export type CoordinateType = [number, number]
export type CoordinatesType = CoordinateType[]

export type InitialMapPointsProps = {
  id: number
  mapPoints: CoordinatesType
}[]

export type RouteWaypointsApiResponseProps = {
  code: string
  routes: [
    {
      geometry: {
        coordinates: CoordinatesType
      }
    }
  ]
}

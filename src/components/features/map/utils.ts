import { RouteData } from "types/routes"

export const filterRouteById = (routes: RouteData[], id: number) => {
  return routes.filter((route) => route.id === id)
}

export const getWaypointsForPolyline = (route: RouteData) => {
  if (!route.mapPoints.length) {
    return []
  }
  return route.wayPoints.map((wayPoint) => [wayPoint[1], wayPoint[0]])
}
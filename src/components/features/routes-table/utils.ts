import { RouteData } from "types/routes"
import {
  TABLE_FIRST_LEVEL_TITLES,
  TABLE_SECOND_LEVEL_TITLES,
} from "./constants"

export function createTableRoutesData(
  routes: RouteData[],
  selectedRoute: number | undefined
) {
  return routes.map((route, index: number) => ({
    key: route.id,
    routeTitle: `${TABLE_FIRST_LEVEL_TITLES.routeTitle.title} №${index + 1}`,
    pointsAmount: route.mapPoints.length,
    status: selectedRoute === route.id,
    secondLevel: route.mapPoints.map((point, index) => ({
      key: index,
      point: `${TABLE_SECOND_LEVEL_TITLES.point.title} №${index + 1}`,
      latitude: point[0],
      longitude: point[1],
    })),
  }))
}

import { CoordinatesType } from "types/routes"

export function fetchRouteWaypointsFromApi(points: CoordinatesType) {
  const wayPoints = points.map((point) => `${point[1]},${point[0]}`).join(";")

  return fetch(
    `https://router.project-osrm.org/route/v1/driving/${wayPoints}?geometries=geojson&overview=full`
  )
    .then((res) => {
      return res.json()
    })
    .catch((err: { message: string }) => err)
}
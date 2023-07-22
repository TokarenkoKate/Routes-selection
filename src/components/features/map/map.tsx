import "leaflet/dist/leaflet.css"
import { MutableRefObject, useEffect, useRef } from "react"
import leaflet, { Polyline, Marker } from "leaflet"
import useMap from "hooks/useMap"
import { RouteData } from "types/routes"
import { filterRouteById, getWaypointsForPolyline } from "./utils"
import CustomMarkerIcon from "components/features/map/custom-marker-icon/custom-marker-icon"

interface MapProps {
  routes: RouteData[]
  selectedRouteId: number | undefined
}

function Map({ routes, selectedRouteId }: MapProps) {
  const mapRef = useRef(null)
  const polylineRef = useRef<Polyline>()
  const markersRef = useRef<Marker[]>([])

  const map = useMap(mapRef, {
    latitude: routes[0].mapPoints[0][0],
    longitude: routes[0].mapPoints[0][1],
  })

  const addNewMarkersAndPolyline = (
    map: leaflet.Map,
    markers: Marker[],
    polyline: Polyline
  ) => {
    markers.forEach((marker) => marker.addTo(map))
    polyline.addTo(map)
  }

  const deleteExisingMarkersAndPolyline = (
    map: leaflet.Map,
    markers: Marker[],
    polyline: Polyline
  ) => {
    markers.forEach((marker) => map.removeLayer(marker))
    map.removeLayer(polyline)
  }

  const savePreviousMarkersAndPolyline = (
    markersRef: MutableRefObject<Marker[] | []>,
    markers: Marker[],
    polylineRef: MutableRefObject<Polyline | undefined>,
    polyline: Polyline
  ) => {
    markersRef.current = markers
    polylineRef.current = polyline
  }

  const zoomToPolyline = (map: leaflet.Map, polyline: Polyline) => {
    const bounds = polyline.getBounds()
    if (bounds.isValid()) {
      map.fitBounds(bounds)
    }
  }

  useEffect(() => {
    if (map && selectedRouteId) {
      const selectedRoute = filterRouteById(routes, selectedRouteId)

      const currentPolylinePoints = getWaypointsForPolyline(selectedRoute[0])
      const currentPolyline = leaflet.polyline(currentPolylinePoints as [number, number][], {
        color: "#7D848B",
        weight: 5,
      })

      const currentMarkers = selectedRoute[0].mapPoints.map((point) => {
        return leaflet.marker(
          {
            lat: point[0],
            lng: point[1],
          },
          { icon: CustomMarkerIcon }
        )
      })

      if (
        markersRef.current &&
        markersRef.current.length !== 0 &&
        polylineRef.current
      ) {
        deleteExisingMarkersAndPolyline(
          map,
          markersRef.current,
          polylineRef.current
        )
      }

      addNewMarkersAndPolyline(map, currentMarkers, currentPolyline)
      zoomToPolyline(map, currentPolyline)

      savePreviousMarkersAndPolyline(
        markersRef,
        currentMarkers,
        polylineRef,
        currentPolyline
      )
    }
  }, [map, routes, selectedRouteId])

  return (
    <section className="map-section">
      <div
        className="map"
        ref={mapRef}
      ></div>
    </section>
  )
}

export default Map

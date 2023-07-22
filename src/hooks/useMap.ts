import { MutableRefObject, useEffect, useRef, useState } from "react"
import { Map, TileLayer } from "leaflet"

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  coordinates: { latitude: number; longitude: number }
) {
  const [map, setMap] = useState<Map | null>(null)
  const isRenderedRef = useRef(false)

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        zoom: 10,
      })

      const layer = new TileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )

      mapInstance.addLayer(layer)

      setMap(mapInstance)

      isRenderedRef.current = true
    }
  }, [mapRef, map])

  return map
}

export default useMap

import { store } from "../store/index"
import { RouteData } from "./routes"

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type RoutesSliceDataProps = {
  routes: RouteData[]
  selectedRoute: number | undefined
  isLoading: boolean
  error: string
}

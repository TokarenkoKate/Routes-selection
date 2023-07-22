import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NameSpace } from "utils/constants"
import { RoutesSliceDataProps } from "types/state"
import { CoordinatesType, InitialMapPointsProps } from "types/routes"

export const initialState: RoutesSliceDataProps = {
  routes: [],
  selectedRoute: undefined,
  isLoading: false,
  error: "",
}

export const RoutesSliceData = createSlice({
  name: NameSpace.Routes,
  initialState,
  reducers: {
    setInitialMapPoints: (
      state,
      action: PayloadAction<InitialMapPointsProps>
    ) => {
      state.routes = action.payload.map((route) => {
        return {
          id: route.id,
          mapPoints: route.mapPoints,
          wayPoints: [],
        }
      })
    },
    getRouteWaypointsAction: (
      state, { payload }: PayloadAction<{ mapPoints: CoordinatesType; id: number }>
    ) => {
      state.error = ""
      state.isLoading = true
      payload
    },
    getRouteWaypointsActionSuccess: (
      state,
      {
        payload: { coordinates, id },
      }: PayloadAction<{ coordinates: CoordinatesType; id: number }>
    ) => {
      const currentRoute = state.routes.filter((route) => route.id === id)[0]
      currentRoute.wayPoints = coordinates
    },
    getRouteWaypointsActionError: (
      state,
      { payload: message }: PayloadAction<string>
    ) => {
      state.error = message
      state.isLoading = false
    },
    setSelectedRoute: (state, { payload: id }: PayloadAction<number>) => {
      state.selectedRoute = id
    },
  },
})

export const {
  setInitialMapPoints,
  getRouteWaypointsAction,
  getRouteWaypointsActionSuccess,
  getRouteWaypointsActionError,
  setSelectedRoute,
} = RoutesSliceData.actions

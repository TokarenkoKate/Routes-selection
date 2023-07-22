import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from "redux-saga/effects"
import { fetchRouteWaypointsFromApi } from "utils/api-calls"
import {
  getRouteWaypointsAction,
  getRouteWaypointsActionError,
  getRouteWaypointsActionSuccess,
} from "./routes"
import { CoordinatesType, RouteWaypointsApiResponseProps } from "types/routes"

export function* getRouteWaypointsSaga({
  payload: { mapPoints, id },
}: PayloadAction<{ mapPoints: CoordinatesType; id: number }>): Generator<
  CallEffect<Response> | PutEffect<AnyAction>,
  void,
  RouteWaypointsApiResponseProps
> {
  try {
    const apiResponse = yield call(fetchRouteWaypointsFromApi, mapPoints)

    yield put(
      getRouteWaypointsActionSuccess({
        coordinates: apiResponse.routes[0].geometry.coordinates,
        id: id,
      })
    )
  } catch (error: any) {
    yield put(getRouteWaypointsActionError(String(error)))
    getRouteWaypointsActionError
  }
}

export function* watchGetRouteWaypoints() {
  yield takeLatest(getRouteWaypointsAction.type, getRouteWaypointsSaga)
}

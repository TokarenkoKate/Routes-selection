import { all, fork } from "redux-saga/effects";
import { watchGetRouteWaypoints } from "./routes/routes-saga";

export const rootSaga = function* () {
  yield all([
    fork(watchGetRouteWaypoints),
  ]);
};

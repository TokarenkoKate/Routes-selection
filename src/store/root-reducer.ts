import { combineReducers } from "@reduxjs/toolkit"
import { NameSpace } from "utils/constants"
import { RoutesSliceData } from "./routes/routes"

export const rootReducer = combineReducers({
  [NameSpace.Routes]: RoutesSliceData.reducer,
})

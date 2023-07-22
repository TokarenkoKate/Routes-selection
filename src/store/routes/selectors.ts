import { RouteData } from "types/routes"
import { State } from "../../types/state"
import { NameSpace } from "../../utils/constants"

export const getRoutes = (state: State): RouteData[] => state[NameSpace.Routes].routes
export const getSelectedRoute = (state: State): number | undefined => state[NameSpace.Routes].selectedRoute
export const getLoadingState = (state: State): boolean => state[NameSpace.Routes].isLoading
export const getError = (state: State): string => state[NameSpace.Routes].error
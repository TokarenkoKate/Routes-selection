export interface FirstLevelColumnsProps {
  key: number
  routeTitle: string
  pointsAmount: number
  status: boolean
}

export interface SecondLevelColumnsProps {
  key: number
  point: string
  latitude: number
  longitude: number
}

export interface DataSourceProps {
  key: number,
  routeTitle: string,
  pointsAmount: number,
  status: boolean,
  secondLevel?: SecondLevelColumnsProps[]
}
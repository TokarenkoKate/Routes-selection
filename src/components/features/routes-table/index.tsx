import { Table, TableColumnsType, Tag } from "antd"
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { getRouteWaypointsAction, setSelectedRoute } from "store/routes/routes"
import { getRoutes, getSelectedRoute } from "store/routes/selectors"
import {
  DataSourceProps,
  FirstLevelColumnsProps,
  SecondLevelColumnsProps,
} from "types/table"
import {
  STATUS_TEXT,
  TABLE_FIRST_LEVEL_TITLES,
  TABLE_SECOND_LEVEL_TITLES,
} from "./constants"
import { createTableRoutesData } from "./utils"

const firstLevelColumns: TableColumnsType<FirstLevelColumnsProps> = [
  {
    title: TABLE_FIRST_LEVEL_TITLES.routeTitle.title,
    dataIndex: TABLE_FIRST_LEVEL_TITLES.routeTitle.key,
    key: TABLE_FIRST_LEVEL_TITLES.routeTitle.key,
    render: (value) => (
      <p className="routes-table_first-column-text">{value}</p>
    ),
  },
  {
    title: TABLE_FIRST_LEVEL_TITLES.pointsAmount.title,
    dataIndex: TABLE_FIRST_LEVEL_TITLES.pointsAmount.key,
    key: TABLE_FIRST_LEVEL_TITLES.pointsAmount.key,
  },
  {
    title: TABLE_FIRST_LEVEL_TITLES.status.title,
    dataIndex: TABLE_FIRST_LEVEL_TITLES.status.key,
    key: TABLE_FIRST_LEVEL_TITLES.status.key,
    render: (status: boolean) => (
      <Tag
        color={status ? "green" : "orange"}
        bordered={false}
        icon={status ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
      >
        {status ? STATUS_TEXT.selected : STATUS_TEXT.not_selected}
      </Tag>
    ),
  },
]

const secondLevelColumns: TableColumnsType<SecondLevelColumnsProps> = [
  {
    title: TABLE_SECOND_LEVEL_TITLES.point.title,
    dataIndex: TABLE_SECOND_LEVEL_TITLES.point.key,
    key: TABLE_SECOND_LEVEL_TITLES.point.key,
    render: (value) => (
      <p className="routes-table_first-column-text">{value}</p>
    ),
  },
  {
    title: TABLE_SECOND_LEVEL_TITLES.latitude.title,
    dataIndex: TABLE_SECOND_LEVEL_TITLES.latitude.key,
    key: TABLE_SECOND_LEVEL_TITLES.latitude.key,
  },
  {
    title: TABLE_SECOND_LEVEL_TITLES.longitude.title,
    dataIndex: TABLE_SECOND_LEVEL_TITLES.longitude.key,
    key: TABLE_SECOND_LEVEL_TITLES.longitude.key,
  },
]

const expandedRowRender = (record: DataSourceProps) => {
  return (
    <Table
      columns={secondLevelColumns}
      dataSource={record.secondLevel}
      pagination={false}
    />
  )
}

function RoutesTable() {
  const dispatch = useAppDispatch()
  const routes = useAppSelector(getRoutes)
  const selectedRoute = useAppSelector(getSelectedRoute)

  // Parse data from routes to fill table;
  const dataSource = createTableRoutesData(routes, selectedRoute)

  // On click table row set selected row id and load the waypoints,
  // if they are empty;
  const onRowClick = (record: DataSourceProps) => {
    const clickedRouteId = record.key
    const currentRoute = routes.filter((route) => route.id === clickedRouteId)

    if (!currentRoute[0].wayPoints.length) {
      dispatch(
        getRouteWaypointsAction({
          mapPoints: currentRoute[0].mapPoints,
          id: clickedRouteId,
        })
      )
    }

    dispatch(setSelectedRoute(clickedRouteId))
  }

  return (
    <Table
      size="middle"
      className="routes-table"
      dataSource={dataSource}
      columns={firstLevelColumns}
      pagination={false}
      onRow={(dataSource) => {
        return {
          onClick: () => onRowClick(dataSource),
        }
      }}
      expandable={{ expandedRowRender }}
      rowClassName={(record) =>
        record.key === selectedRoute
          ? "routes-table__row routes-table__row_active"
          : "routes-table__row"
      }
    />
  )
}

export default RoutesTable

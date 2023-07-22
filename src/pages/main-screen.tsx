import { useAppSelector } from "hooks/redux"
import { getRoutes, getSelectedRoute } from "store/routes/selectors"
import Header from "components/layout/header"
import Map from "components/features/map/map"
import RoutesTable from "components/features/routes-table"
import ErrorModal from "components/features/error-modal/error-modal"

function MainScreen() {
  const routes = useAppSelector(getRoutes)
  const selectedRouteId = useAppSelector(getSelectedRoute)

  return (
    <div className="page">
      <Header />
      <main className="main">
        <section className="routes-content">
          <h2 className="routes-content__title">Выберите маршрут</h2>
          <p className="routes-content__subtitle">
            Нажмите на нужный маршрут, чтобы посмотреть его на карте.
          </p>
          <RoutesTable />
        </section>
        {routes.length !== 0 && (
          <Map
            routes={routes}
            selectedRouteId={selectedRouteId}
          />
        )}
        <ErrorModal />
      </main>
    </div>
  )
}

export default MainScreen

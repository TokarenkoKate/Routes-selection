import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "hooks/redux"
import { initialMapPoints } from "assets/mocks/mocks"
import { setInitialMapPoints } from "store/routes/routes"
import { Approute } from "utils/constants"
import MainScreen from "pages/main-screen"
import NotFoundScreen from "pages/not-found"

function App() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(setInitialMapPoints(initialMapPoints))
  }, [])

  return (
    <Routes>
      <Route
        path={Approute.Main}
        element={<MainScreen />}
      />
      <Route
        path={Approute.NotFound}
        element={<NotFoundScreen />}
      />
    </Routes>
  )
}

export default App

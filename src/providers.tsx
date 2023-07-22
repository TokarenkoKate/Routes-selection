import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/index"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
}

export default Providers

import './styles/main.less'
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/layout/app/App.tsx"
import Providers from "./providers.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)

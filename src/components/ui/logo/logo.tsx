import logo from "assets/logo.png"
import { Link } from "react-router-dom"
import { Approute } from "utils/constants"

function Logo() {
  return (
    <Link
      to={Approute.Main}
      className="logo"
    >
      <h1 className="logo__title">Route Selection</h1>
      <img
        src={logo}
        width={42}
        height={42}
      />
    </Link>
  )
}

export default Logo

import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Nav() {
  const history = useHistory()
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const isLoggedIn = isAuthenticated()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  React.useEffect(() => {
    setIsOpen(!isOpen)
  }, [location.pathname])

  return (
    <nav>
      <div>
        <Link to="/items">
          Items
        </Link>
      </div>
      <div>
        {isLoggedIn && <Link to="/inventoryitems">
          My Items
        </Link>}
      </div>
      <div>
        {!isLoggedIn ?
          <Link to="/login">
            Log In
          </Link>
          :
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        }
      </div>
    </nav>
  )
}

export default Nav
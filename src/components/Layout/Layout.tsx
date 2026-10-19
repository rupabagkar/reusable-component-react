import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const links = [
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
]

export function Layout() {
  return (
    <>
      <header className="app-header">
        <span className="app-header__brand">Shared Components</span>
        <nav className="app-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'app-nav__link active' : 'app-nav__link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout

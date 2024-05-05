import { Link, Outlet } from 'react-router-dom'
import './App.css'

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </nav>
      <Outlet />
    </>
  )
}
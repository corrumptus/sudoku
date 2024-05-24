import { Link } from "react-router-dom";

export default function ActionBar() {
  return (
    <nav className="main-navbar">
      <Link to="/">Home</Link>
      <Link to="/jogar">Jogar</Link>
      <Link to="/quemsomos">Quem somos</Link>
      <Link to="/api">API para devs</Link>
    </nav>
  )
}
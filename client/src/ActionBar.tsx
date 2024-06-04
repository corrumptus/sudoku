import { Link } from "react-router-dom";
import usePageType, { PageType } from "./utils/usePageState";

export default function ActionBar() {
  const pageType = usePageType();

  if (pageType === PageType.NON_USER_PAGE) return (
    <nav className="main-navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </div>
      <div style={{marginLeft: "auto"}}>
        <Link to={"/user/" + localStorage.getItem("sudoku-name") as string}>
          <img src="" alt="" />
        </Link>
      </div>
    </nav>
  )

  if (pageType === PageType.USER_PAGE) return (
    <nav className="main-navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </div>
      <div style={{marginLeft: "auto"}}>
        <Link to={"/user/" + localStorage.getItem("sudoku-name") as string}>
          <img src="" alt="" />
        </Link>
      </div>
    </nav>
  )

  if (pageType === PageType.SELF_USER_PAGE) return (
    <nav className="main-navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </div>
      <div style={{marginLeft: "auto"}}>
        <Link to="">Editar</Link>
        <Link to="">Deletar</Link>
      </div>
    </nav>
  )

  return (
    <nav className="main-navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </div>
      <div>
        <Link to="/signup">Inscrever-se</Link>
        <Link to="/login">Entrar</Link>
      </div>
    </nav>
  )
}
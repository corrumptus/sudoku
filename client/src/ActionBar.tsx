import { Link, useNavigate } from "react-router-dom";
import usePageType, { PageType } from "./utils/usePageState";
import "./styles/navbar.css";

export default function ActionBar() {
  const navigate = useNavigate();
  const pageType = usePageType();

  async function handleDelete() {
    const response = await fetch("http://localhost:5000/user", {
      method: "DELETE",
      headers: {
        "authorization": localStorage.getItem("sudoku-token") || ""
      }
    });

    if (!response.ok) {
      const { error } = await response.json();

      alert(error);
    } else {
      localStorage.setItem("sudoku-token", "");
      localStorage.setItem("sudoku-name", "");
      navigate("/");
    }
  }

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
          <img src="../public/user.png" alt="user icon" />
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
          <img src="../public/user.png" alt="user icon" />
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
        <Link to="/user/edit">Editar</Link>
        <button onClick={handleDelete}>Deletar</button>
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
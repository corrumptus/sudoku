import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h2>Comece a jogar sudoku agora</h2>
      <p>Sudoku consiste em um tabuleiro 9 por 9 com números de 0 a 9 faltando, porém cada linha, coluna e bloco 3 por 3 não podem possuir números repetidos</p>
      <Link to="/jogar">Jogar</Link>
    </div>
  )
}
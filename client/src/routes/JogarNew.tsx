import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getNewGame } from "../sudoku-game-API/sudokuAPI";

export default function JogarNew() {
  const navigate = useNavigate();
  const [ isError, setError ] = useState(false);
  
  useEffect(() => {
    getNewGame()
      .then(id => {
        if (id === undefined) {
          alert("Não foi possível acessar o servidor");
          return;
        }

        if (id === null) {
          setError(true);
          alert("Não existe um novo jogo");
          return;
        }

        navigate("/jogar/" + id);
      });
  });

  return (
    <div className="jogar">
      <h1>Sudoku</h1>
      {isError ?
        <div className="sudoku_rapper">
          <h1>Não foi possível carregar o jogo</h1>
        </div>
        :
        <div className="sudoku_rapper loading">
          <h1>Carregando</h1>
        </div>
      }
    </div>
  )
}
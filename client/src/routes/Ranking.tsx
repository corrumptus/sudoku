import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameRankings } from "../sudoku-game-API/sudokuAPI";
import useRanking from "../utils/useRanking";
import GameRanking from "../components/ranking/GameRanking";
import "../styles/ranking.css";

export default function Ranking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ gameRanking, setGameRanking ] = useState<GameRankings["ranking"] | undefined>(undefined);
  const [ state, setState ] = useState(true);

  useEffect(() => {
    useRanking(Number(id))
      .then(ranking => {
        setState(false);

        if (ranking !== undefined)
          setGameRanking(ranking);
      });
  }, []);

  if (state) return (
    <div className="ranking loading">
      <h1>Carregando</h1>
    </div>
  )

  if (gameRanking === undefined) return (
    <div className="ranking not-found">
      <h1>Não foi possível carregar o jogo {id}</h1>
    </div>
  )

  return (
    <div className="ranking">
      <div>
        <h1>Game {id}</h1>
      </div>
      <div className="table-container">
        <div className="table-inner-container">
          <table>
            <thead>
              <tr>
                <th>Colocação</th>
                <th>Jogador</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {gameRanking.map((r, i) => <GameRanking key={r.name} index={i} ranking={r} />)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => navigate("/jogar/" + id)}>Jogar</button>
      </div>
    </div>
  )
}
import { useNavigate, useParams } from "react-router-dom";
import useRanking from "../utils/useRanking";
import GameRanking from "../components/ranking/GameRanking";

export default function Ranking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const gameRanking = useRanking(Number(id));

  if (gameRanking === undefined) return (
    <div className="ranking not-found">
      <h1>Game not found: {id}</h1>
    </div>
  )

  return (
    <div className="ranking">
      <div>
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
      <div>
        <button onClick={() => navigate("/jogar/" + id)}>Jogar</button>
      </div>
    </div>
  )
}
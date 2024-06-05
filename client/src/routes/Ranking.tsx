import { useParams } from "react-router-dom";
import useRanking from "../utils/useRanking";

export default function Ranking() {
  const { id } = useParams();

  const gameRanking = useRanking(Number(id));

  if (gameRanking === undefined) return (
    <div className="ranking not-found">
      <h1>User not found</h1>
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  )
}
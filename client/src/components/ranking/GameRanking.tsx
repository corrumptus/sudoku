import { useNavigate } from "react-router-dom";
import { Ranking } from "../../utils/useRanking";
import { numberToTime } from "../../utils/utils";

export default function gameRanking({
  ranking,
  index
}: {
  ranking: Ranking,
  index: number
}) {
  const navigate = useNavigate();

  return (
    <tr className="ranking-card">
      <td>{index+1}</td>
      <td onClick={() => navigate("/user/" + ranking.name)}>{ranking.name}</td>
      <td>{numberToTime(ranking.time)}</td>
    </tr>
  )
}
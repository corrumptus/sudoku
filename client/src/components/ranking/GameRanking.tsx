import { useNavigate } from "react-router-dom";
import { numberToTime } from "../../utils/utils";

export default function gameRanking({
  ranking,
  index
}: {
  ranking: {
    name: string;
    time: number;
  },
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
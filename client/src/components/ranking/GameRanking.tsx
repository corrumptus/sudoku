import { Ranking } from "../../utils/useRanking";
import { numberToTime } from "../../utils/utils";

export default function gameRanking({
  ranking,
  index
}: {
  ranking: Ranking,
  index: number
}) {
  return (
    <tr className="ranking-card">
      <td>{index+1}</td>
      <td>{ranking.name}</td>
      <td>{numberToTime(ranking.time)}</td>
    </tr>
  )
}
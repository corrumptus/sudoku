import { numberToTime } from "../../utils/utils";

export default function SelfRanking({
  index,
  time
}: {
  index: number,
  time: number
}) {
  return (
    <li className="self-ranking-card">
      {index+1}º: {numberToTime(time)}
    </li>
  );   
}
import { useNavigate } from "react-router-dom"
import { numberToTime } from "../../utils/utils"

export default function LastTimeCard({
  game,
  time
}: {
  game: number,
  time: number
}) {
  const navigate = useNavigate();

  return (
    <div
      className="last-time-card"
      onClick={() => {
        navigate("/jogar/" + game);
      }}
    >
      <div>
        <img src="../../../public/logo.png" alt="sudoku table icon" />
      </div>
      <div>
        <p>{numberToTime(time)}</p>
      </div>
    </div>
  )
}
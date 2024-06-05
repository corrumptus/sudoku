import { useNavigate } from "react-router-dom";

export default function NonCompletedGameCard({ game }: { game: number }) {
  const navigate = useNavigate();

  return (
    <div
      className="non-completed-game-card"
      onClick={() => {
        navigate("/jogar/" + game);
      }}
    >
      <img src="../../../public/logo.png" alt="sudoku table icon" />
    </div>
  )
}
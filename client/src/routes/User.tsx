import { useParams } from "react-router-dom";
import useUserInfos from "../utils/useUserInfos";
import LastTimeCard from "../components/user/LastTimeCard";
import NonCompletedGameCard from "../components/user/NonCompletedGameCard";
import SelfRanking from "../components/user/SelfRanking";

export default function User() {
  const { name } = useParams();

  const userInfos = useUserInfos(name as string);

  if (userInfos === undefined) return (
    <div className="user not-found">
      <h1>User not found</h1>
    </div>
  )

  return (
    <div className="user">
      <div className="total">
        <p>Total: {userInfos.totalFinished}</p>
      </div>
      <div className="container">
        <div className="last-times">
          <ul>
            {userInfos.lastTimes.map(lt => <LastTimeCard key={lt.gameID} game={lt.gameID} time={lt.time} />)}
          </ul>
        </div>
        <div className="self-ranking">
          <ul>
            {userInfos.timeRankings.map((t, i) => <SelfRanking key={t+i} index={i} time={t} />)}
          </ul>
        </div>
        <div className="to-complete">
          <ul>
            {userInfos.nonFinishedGames.map(g => <NonCompletedGameCard key={g} game={g} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}
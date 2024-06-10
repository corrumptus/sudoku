import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserInfos } from "../sudoku-game-API/sudokuAPI";
import useUserInfos from "../utils/useUserInfos";
import LastTimeCard from "../components/user/LastTimeCard";
import NonCompletedGameCard from "../components/user/NonCompletedGameCard";
import SelfRanking from "../components/user/SelfRanking";
import "../styles/user-name.css";

export default function User() {
  const { name } = useParams();
  
  const [ userInfos, setUserInfos ] = useState<UserInfos | undefined>(undefined);
  const [ state, setState ] = useState(true);

  useEffect(() => {
    useUserInfos(name as string)
      .then(userInfos => {
        setState(false);

        if (userInfos !== undefined)
          setUserInfos(userInfos);
      });
  }, []);

  if (state) return (
    <div className="user loading">
      <h1>Carregando</h1>
    </div>
  )

  if (userInfos === undefined) return (
    <div className="user not-found">
      <h1>User not found: {name}</h1>
    </div>
  )

  return (
    <div className="user">
      <div className="total">
        <p>{userInfos.name}</p>
        <p>Total: {userInfos.totalFinished}</p>
      </div>
      <div className="container">
        <div className="last-times">
          <h2>Últimos jogos</h2>
          <ul>
            {userInfos.lastTimes.map(lt => <LastTimeCard key={lt.id} game={lt.id} time={lt.time} />)}
          </ul>
        </div>
        <div className="self-ranking">
          <h2>Melhores tempos</h2>
          <ul>
            {userInfos.timeRankings.map((t, i) => <SelfRanking key={t+i} index={i} time={t} />)}
          </ul>
        </div>
        <div className="to-complete">
          <h2>Jogos começados</h2>
          <ul>
            {userInfos.nonFinishedGames.map(g => <NonCompletedGameCard key={g} game={g} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}
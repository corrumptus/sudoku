import { GameRankings, getGameRanking } from "../sudoku-game-API/sudokuAPI";

export default async function useRanking(gameId: number): Promise<GameRankings["ranking"] | undefined> {
  const rankings = await getGameRanking(gameId);

  if (rankings === null || rankings === undefined)
    return undefined;

  return rankings.ranking;
}
import { UserInfos, getUserInfos } from "../sudoku-game-API/sudokuAPI";

export default async function useUserInfos(userName: string): Promise<UserInfos | undefined> {
  const playerInfos = await getUserInfos(userName);

  if (playerInfos === null)
    return undefined;

  return playerInfos;
}
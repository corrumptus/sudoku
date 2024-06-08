export type UserInfos = {
  name: string,
  totalFinished: number,
  lastTimes: { gameID: number, time: number }[],
  timeRankings: number[],
  nonFinishedGames: number[]
}

export default function useUserInfos(userName: string): UserInfos | undefined {
  return undefined;
}
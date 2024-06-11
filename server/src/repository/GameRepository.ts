import Game from "../model/Game";

export default class GameRepository {
    static MAX_AMOUNT_OF_GAMES: bigint = 6_670_903_752_021_072_936_960n

    static async getAll(page: number): Promise<GameDTO[]> {
        const allGamesDB = await Game.findAll({
            limit: 20,
            offset: page * 20
        });

        return allGamesDB.map(game => (
            {
                id: (game as any).id,
                lockedCells: JSON.parse((game as any).lockedCells) as LockedCell[]
            }
        ));
    }

    static async get(id: number): Promise<GameDTO | undefined> {
        const gameDB = await Game.findOne({ where: { id } });

        if (gameDB === null)
            return undefined;

        return {
            id: (gameDB as any).id,
            lockedCells: JSON.parse((gameDB as any).lockedCells)
        };
    }

    static async newGame(game: Omit<GameDTO, "id">): Promise<GameDTO | undefined> {
        const newGame = Game.build({ lockedCells: JSON.stringify(game.lockedCells) });

        try {
            const savedGame = await newGame.save();
        
            if (savedGame === null)
                return undefined;

            return {
                id: (savedGame as any).id,
                lockedCells: JSON.parse((savedGame as any).lockedCells)
            };
        } catch (e) {
            return undefined;
        }
    }

    static async newTime(id: number, name: string, time: number): Promise<GameDTO | undefined> {
        return undefined;
    }

    static async getRanking(id: number): Promise<RankingDTO | undefined> {
        return undefined;
    }

    static async hasNonCompletedGames(name: string): Promise<boolean> {
        return false;
    }

    static async getNonCompletedGames(name: string): Promise<GameDTO[]> {
        return [];
    }

    static async amount(): Promise<bigint> {
        return -1n;
    }
}

export type SudokuRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type LockedCell = {
    x: SudokuRange,
    y: SudokuRange,
    valor: SudokuValue
}

export type GameDTO = {
    id: number;
    lockedCells: LockedCell[];
}

export type RankingDTO = {
    gameID: number;
    ranking: {
        player: string;
        time: number;
    }[];
}
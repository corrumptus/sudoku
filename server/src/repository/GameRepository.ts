export default class GameRepository {
    static MAX_AMOUNT_OF_GAMES: bigint = 6_670_903_752_021_072_936_960n

    static async getAll(page: number): Promise<Game[]> {
        return [];
    }

    static async get(id: number): Promise<Game | undefined> {
        return undefined;
    }

    static async newGame(game: Omit<Game, "id">): Promise<Game | undefined> {
        return undefined;
    }

    static async newTime(id: number, name: string, time: number): Promise<Game | undefined> {
        return undefined;
    }

    static async getRanking(id: number): Promise<Ranking | undefined> {
        return undefined;
    }

    static async hasNonCompletedGames(name: string): Promise<boolean> {
        return false;
    }

    static async getNonCompletedGames(name: string): Promise<Game[]> {
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

export type Game = {
    id: number;
    lockedCells: LockedCell[];
}

export type Ranking = {
    gameID: number;
    ranking: {
        player: string;
        time: number;
    }[];
}
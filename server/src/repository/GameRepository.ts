export default class GameRepository {
    static MAX_AMOUNT_OF_GAMES: bigint = 6_670_903_752_021_072_936_960n

    static getAll(page: number): Game[] {
        return [];
    }

    static get(id: number): Game | undefined {
        return undefined;
    }

    static newGame(game: Omit<Game, "id">): Game | undefined {
        return undefined;
    }

    static newTime(id: number, name: string, time: number): Game | undefined {
        return undefined;
    }

    static getRanking(id: number): Ranking | undefined {
        return undefined;
    }

    static hasNonCompletedGames(name: string): boolean {
        return false;
    }

    static getNonCompletedGames(name: string): Game[] {
        return [];
    }

    static get amount(): bigint {
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
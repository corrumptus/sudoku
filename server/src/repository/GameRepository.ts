export default class GameRepository {
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

    static get amount(): number {
        return -1;
    }
}

type LockedCell = {
    x:0|1|2|3|4|5|6|7|8,
    y:0|1|2|3|4|5|6|7|8,
    valor:1|2|3|4|5|6|7|8|9
}

export type Game = {
    id: number;
    lockedCells: LockedCell[];
}

export type Ranking = {
    game: Game;
    ranking: {
        player: string;
        time: number;
    }
}
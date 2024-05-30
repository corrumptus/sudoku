import { Game, Ranking } from "../repository/GameRepository";

export default class GameService {
    static getAll(page: number): Game[] {
        return [];
    }

    static get(id: number): Game | undefined {
        return undefined;
    }

    static getRandom(): Game {
        return [];
    }

    static getNew(name: string): Game | undefined {
        return undefined;
    }

    static getRanking(id: number): Ranking | undefined {
        return undefined;
    }
}
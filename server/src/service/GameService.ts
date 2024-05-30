import { Game } from "../repository/GameRepository";

export default class GameService {
    static getAll(page: number): Game[] {
        return [];
    }

    static getRandom(): Game {
        return [];
    }

    static getNew(name: string): Game | undefined {
        return undefined;
    }
}
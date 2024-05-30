import GameRepository, { Game, Ranking } from "../repository/GameRepository";

export default class GameService {
    static getAll(page: number): Game[] {
        return GameRepository.getAll(page);
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

    static newTime(idNumber: number, name: string, time: number): Game | undefined {
        return undefined;
    }
}
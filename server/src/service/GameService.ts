import GameRepository, { Game, Ranking } from "../repository/GameRepository";

export default class GameService {
    static getAll(page: number): Game[] {
        return GameRepository.getAll(page);
    }

    static get(id: number): Game | undefined {
        return GameRepository.get(id);
    }

    static getRandom(): Game {
        const max = GameRepository.amount;

        const random = Math.floor(Math.random() * max);

        return GameRepository.get(random) as Game;
    }

    static getNew(name: string): Game | undefined {
        return undefined;
    }

    static getRanking(id: number): Ranking | undefined {
        return GameRepository.getRanking(id);
    }

    static newTime(id: number, name: string, time: number): Game | undefined {
        return GameRepository.newTime(id, name, time);
    }
}
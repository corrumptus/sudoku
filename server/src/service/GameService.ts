import GameRepository, { Game, Ranking } from "../repository/GameRepository";
import GameGenarator from "../utils/GameGenerator";

export default class GameService {
    static getAll(page: number): Game[] {
        return GameRepository.getAll(page);
    }

    static get(id: number): Game | undefined {
        return GameRepository.get(id);
    }

    static getRandom(): Game {
        const max = parseInt(GameRepository.amount.toString());

        const random = Math.floor(Math.random() * max);

        return GameRepository.get(random) as Game;
    }

    static getNew(name: string): Game | undefined {
        if (GameRepository.hasNonCompletedGames(name))
            return GameRepository.getNonCompletedGames(name)[0];

        if (GameRepository.amount === GameRepository.MAX_AMOUNT_OF_GAMES) {
            return undefined;
        }

        const newGame = GameGenarator.generate();

        const savedGame = GameRepository.newGame(newGame);

        return savedGame;
    }

    static getRanking(id: number): Ranking | undefined {
        return GameRepository.getRanking(id);
    }

    static newTime(id: number, name: string, time: number): Game | undefined {
        return GameRepository.newTime(id, name, time);
    }
}
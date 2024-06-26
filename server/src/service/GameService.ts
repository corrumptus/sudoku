import GameRepository, { GameDTO, RankingDTO } from "../repository/GameRepository";
import GameGenarator from "../utils/GameGenerator";

export default class GameService {
    static async getAll(page: number): Promise<GameDTO[]> {
        return await GameRepository.getAll(page);
    }

    static async get(id: number): Promise<GameDTO | undefined> {
        return await GameRepository.get(id);
    }

    static async getRandom(): Promise<GameDTO | undefined> {
        if (await GameRepository.amount() === 0n) {
            const newGame = GameGenarator.generate();

            return await GameRepository.newGame(newGame);
        }

        const max = parseInt((await GameRepository.amount()).toString());

        const random = Math.floor(Math.random() * max);

        return await GameRepository.get(random) as GameDTO;
    }

    static async getNew(name: string): Promise<GameDTO | undefined> {
        if (await GameRepository.hasNonCompletedGames(name))
            return (await GameRepository.getNonCompletedGames(name))[0];

        if (await GameRepository.amount() === GameRepository.MAX_AMOUNT_OF_GAMES) {
            return undefined;
        }

        const newGame = GameGenarator.generate();

        return await GameRepository.newGame(newGame);
    }

    static async getRanking(id: number): Promise<RankingDTO | undefined> {
        return await GameRepository.getRanking(id);
    }

    static async newTime(id: number, name: string, time: number): Promise<GameDTO | undefined> {
        return await GameRepository.newTime(id, name, time);
    }
}
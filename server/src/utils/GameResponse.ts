import { GameDTO, RankingDTO } from "../repository/GameRepository";

export default class GameResponse {
    readonly ranking: RankingDTO | undefined;
    readonly games: GameDTO[] | undefined;
    readonly game: GameDTO | undefined;
    readonly errorMessage: string | undefined;

    private constructor(
        ranking: RankingDTO | undefined,
        games: GameDTO[] | undefined,
        game: GameDTO | undefined,
        errorMessage: string | undefined
    ) {
        this.ranking = ranking;
        this.games = games;
        this.game = game;
        this.errorMessage = errorMessage;
    }

    static ofError(errorMessage: string): GameResponse {
        return new GameResponse(undefined, undefined, undefined, errorMessage);
    }

    static ofGame(game: GameDTO): GameResponse {
        return new GameResponse(undefined, undefined, game, undefined);
    }

    static ofGames(games: GameDTO[]): GameResponse {
        return new GameResponse(undefined, games, undefined, undefined);
    }

    static ofRanking(ranking: RankingDTO): any {
        return new GameResponse(ranking, undefined, undefined, undefined);
    }
}
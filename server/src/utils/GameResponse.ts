import { Game, Ranking } from "../repository/GameRepository";

export default class GameResponse {
    readonly ranking: Ranking | undefined;
    readonly games: Game[] | undefined;
    readonly game: Game | undefined;
    readonly errorMessage: string | undefined;

    private constructor(
        ranking: Ranking | undefined,
        games: Game[] | undefined,
        game: Game | undefined,
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

    static ofGame(game: Game): GameResponse {
        return new GameResponse(undefined, undefined, game, undefined);
    }

    static ofGames(games: Game[]): GameResponse {
        return new GameResponse(undefined, games, undefined, undefined);
    }

    static ofRanking(ranking: Ranking): any {
        return new GameResponse(ranking, undefined, undefined, undefined);
    }
}
import { Game } from "../repository/GameRepository";

export default class GameGenarator {
    static generate(): Omit<Game, "id"> {
        return { lockedCells: [] };
    }
}
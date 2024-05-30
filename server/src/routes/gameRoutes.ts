import express from "express";
import GameResponse from "../utils/GameResponse";
import GameService from "../service/GameService";
import TokenService from "../service/TokenService";

const gameRoutes = express();

gameRoutes.get("/jogos", (req, res) => {
    const { page } = req.query;

    const pageNumber = Number(page);

    if (page === undefined || isNaN(pageNumber)) {
        res.status(400).json(GameResponse.ofError("Page must be a valid number"));
        return;
    }

    const games = GameService.getAll(pageNumber);

    res.json(GameResponse.ofGames(games));
});

gameRoutes.get("/jogos/new", (req, res) => {
    const token = req.headers.authorization;

    if (token === undefined) {
        res.json(GameResponse.ofGame(GameService.getRandom()));
        return;
    }

    const payload = TokenService.validate(token);

    if (payload === undefined) {
        res.status(404).json(GameResponse.ofError("Invalid Token"));
        return;
    }

    const newGame = GameService.getNew(payload.name);

    if (newGame === undefined) {
        res.json(GameResponse.ofError("Player exceed the max amount of game possibilities"));
        return;
    }

    res.json(GameResponse.ofGame(newGame));
});

export default gameRoutes;
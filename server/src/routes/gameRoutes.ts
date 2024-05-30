import express from "express";
import GameResponse from "../utils/GameResponse";
import GameService from "../service/GameService";
import TokenService from "../service/TokenService";
import UserRepository from "../repository/UserRepository";

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

gameRoutes.get("/jogos/:id", (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).json(GameResponse.ofError("ID must be a valid number"));
        return;
    }

    const game = GameService.get(idNumber);

    if (game === undefined) {
        res.status(404).json(GameResponse.ofError(`Game not found with the ID ${id}`));
        return;
    }

    res.json(GameResponse.ofGame(game));
});

gameRoutes.get("/jogos/:id/ranking", (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).json(GameResponse.ofError("ID must be a valid number"));
        return;
    }

    const ranking = GameService.getRanking(idNumber);

    if (ranking === undefined) {
        res.status(404).json(GameResponse.ofError("Game not found"));
        return;
    }

    res.json(GameResponse.ofRanking(ranking));
});

gameRoutes.post("/jogos/:id", (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).json(GameResponse.ofError("ID must be a valid number"));
        return;
    }

    const token = req.headers.authorization;

    if (token === undefined || typeof token !== "string" || token.trim() === "") {
        res.status(400).json(GameResponse.ofError("Token cannot be blank"));
        return;
    }

    const payload = TokenService.validate(token);

    if (payload === undefined) {
        res.status(401).json(GameResponse.ofError("Invalid token"));
        return;
    }

    const user = UserRepository.get(payload.name);

    if (user === undefined) {
        res.status(404).json(GameResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const time = Number(req.body["time"]);

    if (isNaN(time)) {
        res.status(400).json(GameResponse.ofError("Time must be a valid number"));
        return;
    }

    const game = GameService.newTime(idNumber, user.name, time);

    if (game === undefined) {
        res.status(500).json(GameResponse.ofError("Somthing went wrong on saving the new time"));
        return;
    }

    res.json(GameResponse.ofGame(game));
});

export default gameRoutes;
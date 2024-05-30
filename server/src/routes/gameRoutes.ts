import express from "express";
import GameResponse from "../utils/GameResponse";
import GameService from "../service/GameService";

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

export default gameRoutes;
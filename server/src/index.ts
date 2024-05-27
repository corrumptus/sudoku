import express, { Express, json } from 'express';
import cors from "cors";
import UserResponse from './utils/UserResponse';
import UserRepository from './repository/UserRepository';

const PORT: number = Number(process.env.PORT) || 5000;

const api: Express = express();

api.listen(PORT, () => console.log(`server starts at port ${PORT}`));

api.use(json());

api.use(cors());

api.get("/", (_, res) => {
    res.redirect("sudoku-pi-umber.vercel.app/api");
});

api.post("/login", (req, res) => {
    const { name, password } = req.body;

    if (name === undefined || name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password === undefined || password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const user = UserRepository.get(name);

    if (user === undefined || password !== user.password) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const token = "";

    res.json(UserResponse.ofToken(token));
});

api.post("/login/token", (req, res) => {
    const { token } = req.body;

    if (token === undefined || token.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    const name = "";

    if (name === undefined) {
        res.status(400).json();
    }

    const user = UserRepository.get(name);

    if (user === undefined) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const newToken = "";

    res.json(UserResponse.ofToken(newToken));
});
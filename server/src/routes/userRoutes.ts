import express from 'express';
import UserResponse from '../utils/UserResponse';
import UserRepository from '../repository/UserRepository';
import TokenService from '../service/TokenService';

const userRoute = express();

userRoute.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (name === undefined || typeof name !== "string" || name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password === undefined || typeof password !== "string" || password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const user = await UserRepository.get(name);

    if (user === undefined || password !== user.password) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const token = TokenService.newToken(name);

    res.json(UserResponse.ofToken(token));
});

userRoute.post("/login/token", async (req, res) => {
    const { token } = req.body;

    if (token === undefined || typeof token !== "string" || token.trim() === "") {
        res.status(400).json(UserResponse.ofError("Token cannot be blank"));
        return;
    }

    const payload = await TokenService.validate(token);

    if (payload === undefined) {
        res.status(401).json(UserResponse.ofError("Invalid token"));
        return;
    }

    const user = await UserRepository.get(payload.name);

    if (user === undefined) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const newToken = TokenService.newToken(user.name);

    res.json(UserResponse.ofToken(newToken));
});

userRoute.post("/signup", async (req, res) => {
    const { name, password } = req.body;

    if (name === undefined || typeof name !== "string" || name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password === undefined || typeof password !== "string" || password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const user = await UserRepository.create(name, password);

    if (user === undefined) {
        res.status(409).json(UserResponse.ofError(`User with the name ${name} already exists`));
        return;
    }

    const token = await TokenService.newToken(name);

    res.status(201).json(UserResponse.ofToken(token));
});

userRoute.post("/user/edit", async (req, res) => {
    const { name, password } = req.body;

    if (name !== undefined && typeof name !== "string" && name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password !== undefined && typeof password !== "string" && password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const token = req.headers.authorization;

    if (token === undefined || typeof token !== "string" || token.trim() === "") {
        res.status(400).json(UserResponse.ofError("Token cannot be blank"));
        return;
    }

    const payload = await TokenService.validate(token);

    if (payload === undefined) {
        res.status(401).json(UserResponse.ofError("Invalid token"));
        return;
    }

    const user = await UserRepository.update(payload.name, name, password);

    if (user === undefined) {
        res.status(500).json(UserResponse.ofError("Cannot update the user"));
        return;
    }

    const newToken = await TokenService.newToken(user.name);

    res.json(UserResponse.ofToken(newToken));
})

export default userRoute;
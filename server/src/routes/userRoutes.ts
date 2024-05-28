import express from 'express';
import UserResponse from '../utils/UserResponse';
import UserRepository from '../repository/UserRepository';
import TokenService from '../service/TokenService';

const userRoute = express();

userRoute.post("/login", (req, res) => {
    const { name, password } = req.body;

    if (name === undefined || typeof name !== "string" || name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password === undefined || typeof password !== "string" || password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const user = UserRepository.get(name);

    if (user === undefined || password !== user.password) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const token = TokenService.newToken(name);

    res.json(UserResponse.ofToken(token));
});

userRoute.post("/login/token", (req, res) => {
    const { token } = req.body;

    if (token === undefined || typeof token !== "string" || token.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    const payload = TokenService.validate(token);

    if (payload === undefined) {
        res.status(401).json(UserResponse.ofError("Invalid token"));
        return;
    }

    const user = UserRepository.get(payload.name);

    if (user === undefined) {
        res.status(404).json(UserResponse.ofError("Username and/or password are incorrect"));
        return;
    }

    const newToken = TokenService.newToken(user.name);

    res.json(UserResponse.ofToken(newToken));
});

userRoute.post("/signup", (req, res) => {
    const { name, password } = req.body;

    if (name === undefined || typeof name !== "string" || name.trim() === "") {
        res.status(400).json(UserResponse.ofError("Name cannot be blank"));
        return;
    }

    if (password === undefined || typeof password !== "string" || password.trim() === "") {
        res.status(400).json(UserResponse.ofError("Password cannot be blank"));
        return;
    }

    const user = UserRepository.create(name, password);

    if (user === undefined) {
        res.status(409).json(UserResponse.ofError(`User with the name ${name} already exists`));
        return;
    }

    const token = TokenService.newToken(name);

    res.status(201).json(UserResponse.ofToken(token));
});

export default userRoute;
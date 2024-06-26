import express, { Express, json } from 'express';
import cors from "cors";
import userRoute from './routes/userRoutes';
import gameRoutes from './routes/gameRoutes';

const PORT: number = Number(process.env.PORT) || 5000;

const api: Express = express();

api.listen(PORT, () => console.log(`server starts at port ${PORT}`));

api.use(json());

api.use(cors());

api.get("/", (_, res) => {
    res.redirect("sudoku-pi-umber.vercel.app");
});

api.use("/", userRoute);

api.use("/", gameRoutes);
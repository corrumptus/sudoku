import express, { Express, json } from 'express';

const PORT: number = Number(process.env.PORT) || 5000;

const api: Express = express();

api.listen(PORT, () => console.log(`server starts at port ${PORT}`));

api.use(json())
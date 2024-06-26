import { Dialect, Sequelize } from "sequelize";

const connection = new Sequelize(
    process.env.DATABASE_NAME as string,
    process.env.DATABASE_USER as string,
    process.env.DATABASE_PASSWORD as string,
    {
        dialect: process.env.DATABASE_DIALECT as Dialect,
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT)
    }
);

export default connection;
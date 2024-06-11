import Sequelize from "sequelize";
import connection from "../repository/connecation";

const Game = connection.define("Game", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    lockedCells: {
        type: Sequelize.STRING(1090),
        allowNull: false
    }
});

export default Game;
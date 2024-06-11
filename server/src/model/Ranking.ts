import Sequelize from "sequelize";
import connection from "../repository/connecation";
import Game from "./Game";
import User from "./User";

const Ranking = connection.define("Ranking", {
    game_id: {
        type: Sequelize.BIGINT,
        references: {
            model: Game,
            key: "id"
        },
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: "name"
        },
        allowNull: false
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.belongsToMany(Game, { through: Ranking });

Game.belongsToMany(User, { through: Ranking });

export default Ranking;
import Sequelize from "sequelize";
import connection from "../repository/connecation";
import Game from "./Game";
import User from "./User";

const IncompleteGames = connection.define("IncompleteGames", {
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
    }
});

User.belongsToMany(Game, { through: IncompleteGames });

Game.belongsToMany(User, { through: IncompleteGames });

export default IncompleteGames;
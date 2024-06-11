import Sequelize from "sequelize";
import connection from "../repository/connecation";

const User = connection.define("User", {
    name: {
        type: Sequelize.STRING,
        "allowNull": false,
        "primaryKey": true
    },
    password: {
        type: Sequelize.STRING(32),
        "allowNull": false
    }
});

export default User;
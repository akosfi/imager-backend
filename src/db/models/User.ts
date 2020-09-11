import db from "../index";

import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    db,
    modelName: 'User'
});

export default User;
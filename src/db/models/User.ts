import {DataTypes, Model, InitOptions, Sequelize} from 'sequelize';

class User extends Model {}

export const initUserModel = (db: Sequelize) => User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db
});

export default User;
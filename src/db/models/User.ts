import {DataTypes, Model, Sequelize, Optional, CreateOptions} from 'sequelize';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
}

export const initUserModel = (db: Sequelize) => User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users",
    sequelize: db,
    hooks: {
        beforeCreate(user: User) {
            console.log(user);
        }
    }
});

export default User;
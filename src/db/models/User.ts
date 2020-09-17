import {DataTypes, Model, Sequelize, Optional, Association} from 'sequelize';
import bcrypt from "bcrypt";
import Image from "./Image";

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

    public readonly images?: Image[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        projects: Association<User, Image>;
    };
}

export const initUserModel = (db: Sequelize) => User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});

export default User;
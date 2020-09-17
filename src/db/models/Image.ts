import {DataTypes, Model, Sequelize, Optional} from 'sequelize';
import bcrypt from "bcrypt";

interface ImageAttributes {
    id: number;
    url: string;
    user_id: number;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
    public id!: number;
    public url!: string;
    public user_id!: number;
}

export const initImageModel = (db: Sequelize) => Image.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: "images",
    sequelize: db
});

export default Image;
import {Sequelize} from "sequelize";
import User, {initUserModel} from "./models/User";
import Image, {initImageModel} from "./models/Image";
import createAssociations from "./models/_associations";

const db = new Sequelize({ dialect: "sqlite", storage: "./db/db.sqlite" });


export const initDB = () => new Promise(((resolve) => {
    db
        .authenticate()
        .then(() => {
            initImageModel(db);
            initUserModel(db);
            User.sync()
                .then(() => Image.sync())
                .then(() => createAssociations())
                .then(() => resolve());
        }).catch(err => console.log(err));
}));

export default db;
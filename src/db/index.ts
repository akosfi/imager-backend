import {Sequelize} from "sequelize";
import User, {initUserModel} from "./models/User";

const db = new Sequelize('sqlite::memory:');


export const initDB = () => new Promise(((resolve) => {
    db
        .authenticate()
        .then(() => {
            initUserModel(db);
            User.sync().then(() => resolve());
        })
        .catch(err => console.log("Failed connecting to the database"))
}));

export default db;
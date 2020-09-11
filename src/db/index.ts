import {Sequelize} from "sequelize";
import User from "./models/User";

const db = new Sequelize('sqlite::memory:');

db.authenticate(async () => {
    await User.sync();
});

export default db;
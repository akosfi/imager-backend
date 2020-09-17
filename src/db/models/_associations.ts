import User from "./User";
import Image from "./Image";

const createAssociations = () => new Promise((resolve, reject) => {
    try {
        User.hasMany(Image, {
            sourceKey: "id",
            foreignKey: "user_id",
            as: "images",
        });
        resolve();
    }
    catch(e) {
        reject(e);
    }
});

export default createAssociations;
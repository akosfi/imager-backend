import {FindOptions} from "sequelize";
import Image from "../db/models/Image";

export const findOne = async (options: FindOptions<Image>) => await Image.findOne(options);

export const findAll = async (options: FindOptions<Image>) => await Image.findAll(options);

export const findAllByUser = async (_user_id: number) => await Image.findAll({where: {user_id: _user_id}})

const ImageService = {
    findOne,
    findAll,
    findAllByUser
};

export default ImageService;
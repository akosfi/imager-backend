import {FindOptions} from "sequelize";
import Image from "../db/models/Image";

export const findOne = async (options: FindOptions<Image>) => await Image.findOne(options);

export const findAll = async (options: FindOptions<Image>) => await Image.findAll(options);

export const findAllByUser = async (_user_id: number) => await Image.findAll({where: {user_id: _user_id}})

export const createImage = async(url: string, user_id: number) => await Image.create({ url, user_id })

const ImageService = {
    findOne,
    findAll,
    findAllByUser,
    createImage
};

export default ImageService;
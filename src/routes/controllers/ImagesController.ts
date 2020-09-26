import {Router, Request, Response} from "express";
import ImageService from "../../services/ImageService";
import {createResponseBody} from "../../utils/RequestUtils";
import {uploadImageMiddleware} from "../../middlewares/upload";
import authMiddleware from "../../middlewares/auth";
const imagesRouter = Router();

export enum RouteConfig {
    ROOT = "/images",
    IMAGES_SHOW = "/",
    IMAGES_INDEX = "/:id",
    IMAGES_CREATE = "/",
}

const getAllImage = async (req: Request, res: Response) => {
    const { user: { id: user_id } } = req;

    try {
        const images = await ImageService.findAllByUser(user_id);
        return res.status(200).send(createResponseBody(200, { images }));
    }
    catch(e) {
        return res.status(400).send(createResponseBody(200, {e}))
    }
}

const getImage = async (req: Request, res: Response) => {
    const { params: { id } } = req;
    try {
        const image = await ImageService.findOne({where: { id }});
        if(!image) {
            return res.status(404).send(createResponseBody(404, { error: "Image not found." }));
        }
        return res.status(200).send(createResponseBody(200, { image }));
    }
    catch(e) {
        return res.status(400).send(createResponseBody(200, { error: e }))
    }
}

const postImage = async (req: Request, res: Response) => {
    const { user: { id: user_id }, uploaded_file_url } = req;

    try {
        const image = await ImageService.createImage(uploaded_file_url, user_id);
        return res.status(200).send(createResponseBody(200, { image }));
    }
    catch(e) {
        return res.status(400).send(createResponseBody(200, { error: e }))
    }
}

imagesRouter.get(RouteConfig.IMAGES_SHOW, authMiddleware, getAllImage);
imagesRouter.get(RouteConfig.IMAGES_INDEX, authMiddleware, getImage);
imagesRouter.post(RouteConfig.IMAGES_CREATE, authMiddleware, uploadImageMiddleware, postImage);

export default imagesRouter;

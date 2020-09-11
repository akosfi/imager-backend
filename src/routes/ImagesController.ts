import {Router, Request, Response} from "express";
const imagesRouter = Router();

const getAllImage = (req: Request, res: Response) => {
    res.send("Here are your images!");
}

const getImage = (req: Request, res: Response) => {

}

const postImage = (req: Request, res: Response) => {

}

imagesRouter.get('/', getAllImage);
imagesRouter.get('/{id}/', getImage);
imagesRouter.post('/', postImage);

export default imagesRouter;
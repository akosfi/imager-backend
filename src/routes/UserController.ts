import {Router, Request, Response} from "express";
const usersRouter = Router();

const authenticateUser = (req: Request, res: Response) => {
    res.send("Here are your images!");
}

const getUser = (req: Request, res: Response) => {

}

const postUser = (req: Request, res: Response) => {

}

usersRouter.get('/me', authenticateUser);
usersRouter.get('/{id}/', getUser);
usersRouter.post('/', postUser);

export default usersRouter;
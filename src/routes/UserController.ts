import {Router, Request, Response} from "express";
import authMiddleware from "../middlewares/auth";

const usersRouter = Router();

const authenticateUser = (req: Request, res: Response) => {
    res.send("Here are your images!");
}

const getUser = (req: Request, res: Response) => {

}

const postUser = (req: Request, res: Response) => {

}

usersRouter.get('/me', authenticateUser);
usersRouter.get('/{id}/', authMiddleware, getUser);
usersRouter.post('/', postUser);

export default usersRouter;
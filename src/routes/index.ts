import {Router} from "express";
import imagesRouter from "./ImagesController";
import usersRouter from "./UserController";
const apiRouter = Router();

apiRouter.use('/images', imagesRouter);
apiRouter.use('/', usersRouter);

export default apiRouter;
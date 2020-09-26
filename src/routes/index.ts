import {Router} from "express";
import imagesRouter, { RouteConfig as ImagesRouteConfig } from "./controllers/ImagesController";
import usersRouter, { RouteConfig as UsersRouteConfig }from "./controllers/UserController";
const apiRouter = Router();

apiRouter.use('/images', imagesRouter);
apiRouter.use('/', usersRouter);

export default apiRouter;
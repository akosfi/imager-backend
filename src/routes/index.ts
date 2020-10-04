import {Router} from "express";
import imagesRouter from "./controllers/ImagesController";
import usersRouter from "./controllers/UserController";
import healthCheckRouter from "./controllers/health_check_contoller/HealthCheckController";
const apiRouter = Router();

apiRouter.use('/images', imagesRouter);
apiRouter.use('/', usersRouter);
apiRouter.use('/health-check', healthCheckRouter);

export default apiRouter;
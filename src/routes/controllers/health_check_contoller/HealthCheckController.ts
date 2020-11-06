import {Router, Request, Response} from "express";
const healthCheckRouter = Router();

export enum RouteConfig {
    ROOT = "/",
    TEST = "/test",
}

const getServerHealth = (req: Request, res: Response) => res.status(200).send({"status": "OK!"});

const getNewTestMessage = (req: Request, res: Response) => res.status(200).send({"message": "Hey my man!"});

healthCheckRouter.use(RouteConfig.ROOT, getServerHealth);
healthCheckRouter.use(RouteConfig.TEST, getNewTestMessage);

export default healthCheckRouter;

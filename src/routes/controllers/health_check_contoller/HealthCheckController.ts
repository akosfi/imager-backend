import {Router, Request, Response} from "express";
const healthCheckRouter = Router();

export enum RouteConfig {
    ROOT = "/",
    TEST = "/test",
}

const getServerHealth = (req: Request, res: Response) => res.status(201).send({"status": "Hey!"});

const getNewTestMessage = (req: Request, res: Response) => res.status(201).send({"message": "Hey my man!"});

healthCheckRouter.use(RouteConfig.ROOT, getServerHealth);
healthCheckRouter.use(RouteConfig.TEST, getNewTestMessage);

export default healthCheckRouter;

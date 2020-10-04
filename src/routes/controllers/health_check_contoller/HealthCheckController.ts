import {Router, Request, Response} from "express";
const healthCheckRouter = Router();

export enum RouteConfig {
    ROOT = "/",
}

const getServerHealth = (req: Request, res: Response) => res.status(201).send({"status": "Hey!"});

healthCheckRouter.use(RouteConfig.ROOT, getServerHealth);

export default healthCheckRouter;

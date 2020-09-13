import {NextFunction, Request, Response} from "express";
import {createResponseBody} from "../utils/RequestUtils";
import {getBearerTokenFromHeader, TokenType, verifyJWT} from "../utils/JWTUtils";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessTokenPayload = getBearerTokenFromHeader(req);

    if(!accessTokenPayload) return res.status(401).send(createResponseBody(401, {error: "Invalid JWT"}));
    next();
}


export const inverseAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessTokenPayload = getBearerTokenFromHeader(req);

    if(accessTokenPayload) return res.redirect("/");
    next();
}

export default authMiddleware;
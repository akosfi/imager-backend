import {request, Request, Response, Router} from "express";
import authMiddleware from "../middlewares/auth";
import {getBearerTokenFromHeader, signJWT, TokenType, verifyJWT} from "../utils/JWTUtils";
import {createResponseBody} from "../utils/RequestUtils";

const usersRouter = Router();

const authenticateUser = (req: Request, res: Response) => {
    res.send("Here are your images!");
}

const getUser = (req: Request, res: Response) => {

}

const postUser = (req: Request, res: Response) => {

}

const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.jwt;

    const refreshTokenPayload = verifyJWT(TokenType.REFRESH, refreshToken);
    const accessTokenPayload = getBearerTokenFromHeader(request);

    if(!accessTokenPayload || !refreshTokenPayload) return res.status(401).send(createResponseBody(401, {error: "Invalid JWT"}));

    const newAccessToken = signJWT(TokenType.ACCESS, {email: "TODO@TODO.TODO"});
    const newRefreshToken = signJWT(TokenType.REFRESH, {email: "TODO@TODO.TODO"});

    res.cookie("jwt", newRefreshToken, {secure: true, httpOnly: true});
    return res.status(200).send(createResponseBody(200, {token: newAccessToken}));
}

usersRouter.get('/me', authenticateUser);
usersRouter.get('/{id}/', authMiddleware, getUser);
usersRouter.get('/refresh', authMiddleware, refreshToken);
//
usersRouter.post('/', postUser);

export default usersRouter;
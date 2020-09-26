import {request, Request, Response, Router} from "express";
import authMiddleware, {inverseAuthMiddleware} from "../../middlewares/auth";
import {
    getBearerTokenFromHeader,
    sendTokenResponse,
    signJWT,
    TokenType,
    UserTokenPayload,
    verifyJWT
} from "../../utils/JWTUtils";
import {createResponseBody} from "../../utils/RequestUtils";
import User from "../../db/models/User";
import UserService from "../../services/UserService";

const usersRouter = Router();

export enum RouteConfig {
    ROOT = "/users",
    USERS_ME = "/me",
    USERS_TOKEN_REFRESH = "/refresh",
    USERS_LOGIN = "/login",
    USERS_REGISTER = "/register",
}

const getLoggedInUser = async (req: Request, res: Response) => {
    const { user: { email: _email } } = req;

    try {
        const user: User | null = await UserService.findOneByEmail(_email);
        if(!user) new Error("User not found.");

        const {email, id} = user;

        return res.status(200).send(createResponseBody(200, {user: {email, id}}))
    }
    catch(e) {
        return res.status(404).send(createResponseBody(404, {error: "Failed to find user."}));
    }
}

const loginUser = async (req: Request, res: Response) => {
    const {email: _email, password: _password} = req.body;

    if(!_email || !_password) return res.status(400).send(createResponseBody(400, {error: "Missing email or password."}));

    try {
        const user: User | null = await UserService.findOneByEmail(_email);
        if(user === null) new Error("User not found.");

        const {email, id} = user as User;

        const newAccessToken = signJWT(TokenType.ACCESS, {email, id});
        const newRefreshToken = signJWT(TokenType.REFRESH, {email, id});

        return sendTokenResponse(res, newRefreshToken, newAccessToken);
    }
    catch(e) {
        return res.status(404).send(createResponseBody(404, {error: "Failed to find user."}));
    }
}

const registerUser = async (req: Request, res: Response) => {
    const { email: _email, password: _password } = req.body;

    if(!_email || !_password) return res.status(400).send(createResponseBody(400, {error: "Missing email or password."}));

    try {
        const user: User | null = await User.create({ email: _email, password: _password });
        if(user === null) new Error("User failed to create.");

        const {email, id} = user as User;

        const newAccessToken = signJWT(TokenType.ACCESS, {email, id});
        const newRefreshToken = signJWT(TokenType.REFRESH, {email, id});

        return sendTokenResponse(res, newRefreshToken, newAccessToken);
    }
    catch(e) {
        return res.status(404).send(createResponseBody(404, {error: "Failed to create user."}));
    }
}

const refreshToken = async (req: Request, res: Response) => {
    const { cookies: { jwt: refreshToken }, user: {email: _email}} = req;

    const refreshTokenPayload = verifyJWT(TokenType.REFRESH, refreshToken);
    const accessTokenPayload = req.user;

    if(!accessTokenPayload || !refreshTokenPayload) return res.status(401).send(createResponseBody(401, {error: "Invalid JWT"}));

    try {
        const user: User | null = await UserService.findOneByEmail(_email);
        if(user === null) new Error("User not found.");

        const {email, id} = user as User;

        const newAccessToken = signJWT(TokenType.ACCESS, {email, id});
        const newRefreshToken = signJWT(TokenType.REFRESH, {email, id});

        return sendTokenResponse(res, newRefreshToken, newAccessToken);
    }
    catch(e) {
        return res.status(404).send(createResponseBody(404, {error: "Failed to find user."}));
    }
}

usersRouter.get(RouteConfig.USERS_ME, authMiddleware, getLoggedInUser);
usersRouter.get(RouteConfig.USERS_TOKEN_REFRESH, authMiddleware, refreshToken);
//
usersRouter.post(RouteConfig.USERS_LOGIN, inverseAuthMiddleware, loginUser);
usersRouter.post(RouteConfig.USERS_REGISTER, inverseAuthMiddleware, registerUser);

export default usersRouter;
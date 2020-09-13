import {request, Request, Response, Router} from "express";
import authMiddleware, {inverseAuthMiddleware} from "../middlewares/auth";
import {
    getBearerTokenFromHeader,
    sendTokenResponse,
    signJWT,
    TokenType,
    UserTokenPayload,
    verifyJWT
} from "../utils/JWTUtils";
import {createResponseBody} from "../utils/RequestUtils";
import User from "../db/models/User";
import UserService from "../services/UserService";

const usersRouter = Router();

const getLoggedInUser = async (req: Request, res: Response) => {
    const accessTokenPayload: UserTokenPayload = getBearerTokenFromHeader(req);
    if(!accessTokenPayload) return res.status(401).send(createResponseBody(401, {error: "Invalid JWT"}));

    const {email: _email} = accessTokenPayload;

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
    const {email: _email, password: _password} = req.body;

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

const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.jwt;

    const refreshTokenPayload = verifyJWT(TokenType.REFRESH, refreshToken);
    const accessTokenPayload = getBearerTokenFromHeader(request);

    if(!accessTokenPayload || !refreshTokenPayload) return res.status(401).send(createResponseBody(401, {error: "Invalid JWT"}));

    const newAccessToken = signJWT(TokenType.ACCESS, {email: "TODO@TODO.TODO", id: 1});
    const newRefreshToken = signJWT(TokenType.REFRESH, {email: "TODO@TODO.TODO", id: 1});

    return sendTokenResponse(res, newRefreshToken, newAccessToken);
}

usersRouter.get('/me', authMiddleware, getLoggedInUser);
usersRouter.get('/refresh', authMiddleware, refreshToken);
usersRouter.get('/login', inverseAuthMiddleware, loginUser);
//
usersRouter.post('/register', inverseAuthMiddleware, registerUser);

export default usersRouter;
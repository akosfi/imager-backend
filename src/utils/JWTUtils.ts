import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {createResponseBody} from "./RequestUtils";
import User from "../db/models/User";

export type UserTokenPayload = {
    email: string;
    id: number;
}

export enum TokenType {
    ACCESS,
    REFRESH
}

export const signJWT = (tokenType: TokenType, userPayload: UserTokenPayload) => {
    if(!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) throw new Error("Token secret(s) missing!");

    const secret = tokenType === TokenType.REFRESH ? (process.env.REFRESH_TOKEN_SECRET as string) : (process.env.ACCESS_TOKEN_SECRET as string);
    const expiresIn = tokenType === TokenType.REFRESH ? process.env.REFRESH_TOKEN_LIFE : process.env.ACCESS_TOKEN_LIFE;

    return jwt.sign(userPayload, secret, {
       algorithm: "HS256",
       expiresIn
    });
}

export const verifyJWT = (tokenType: TokenType, token: string) => {
    if(!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) throw new Error("Token secret(s) missing!");

    const secret = tokenType === TokenType.REFRESH ? (process.env.REFRESH_TOKEN_SECRET as string) : (process.env.ACCESS_TOKEN_SECRET as string);

    try {
        return jwt.verify(token, secret);
    }catch(e) {
        return null;
    }
}

//TODO redo check
export const getBearerTokenFromHeader = (req: Request): UserTokenPayload => {
    const authorizationHeader = req.headers.authorization || "";
    const accessToken = authorizationHeader.substring(7, authorizationHeader.length);

    if(!authorizationHeader.startsWith("Bearer ")) return null;

    const payload = verifyJWT(TokenType.ACCESS, accessToken);
    if(payload === null) return null;

    if(typeof payload === "string") {
        const parsedPayload: UserTokenPayload = JSON.parse(payload);
        return parsedPayload;
    }

    return payload as UserTokenPayload;
}

export const sendTokenResponse = (res: Response, newRefreshToken: string, newAccessToken: string) => {
    res.cookie("jwt", newRefreshToken, {secure: false, httpOnly: true});
    return res.status(200).send(createResponseBody(200, {token: newAccessToken}));
}
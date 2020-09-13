import jwt from "jsonwebtoken";
import {Request} from "express";

type UserPayload = {
    email: string;
}

export enum TokenType {
    ACCESS,
    REFRESH
}

export const signJWT = (tokenType: TokenType, userPayload: UserPayload) => {
    if(!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) throw new Error("Token secret(s) missing!");

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

export const getBearerTokenFromHeader = (req: Request) => {
    const authorizationHeader = req.headers["Authorization"] as string || "";
    const accessToken = authorizationHeader.substring(7, authorizationHeader.length);

    if(!authorizationHeader.startsWith("Bearer ")) return null;

    return verifyJWT(TokenType.ACCESS, accessToken);
}
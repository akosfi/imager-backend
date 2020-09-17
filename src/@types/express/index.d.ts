import {UserTokenPayload} from "../../utils/JWTUtils";

declare global {
    namespace Express {
        interface Request {
            user?: UserTokenPayload;
            uploaded_file_url?: string;
        }
    }
}
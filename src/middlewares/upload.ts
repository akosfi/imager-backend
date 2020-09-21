import multer, {MulterError} from "multer";
import {NextFunction, Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';
import {rename, unlink} from "fs";
import { extname, join } from "path";
import {createResponseBody} from "../utils/RequestUtils";

const multerUpload = multer({dest: "./uploads"}).single('file' )

export const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    multerUpload(req, res,  (err: any) => {
        if (err) {
            next(err);
        }

        const uniqueFileName = uuidv4();
        const tempPath = req.file.path;
        const targetPath = join(__dirname, `../public/${uniqueFileName}.png`);

        const fileExt = extname(req.file.originalname).toLowerCase();

        if (fileExt === ".png" || fileExt === ".jpg") {
            req.uploaded_file_url = targetPath;
            next();
        } else {
            return unlink(tempPath, err => {
                if (err) return res.status(400).send(createResponseBody(400, { error: err }))

                return res.status(400).send(createResponseBody(400, { error: "Only png files are allowed" }));
            });
        }
    });
};
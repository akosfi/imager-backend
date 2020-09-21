import multer from "multer";
import {NextFunction, Request, Response} from "express";
import { unlink } from "fs";
import { extname } from "path";
import { createResponseBody } from "../utils/RequestUtils";

const multerUpload = multer({dest: "./public"}).single('file' )

export const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    multerUpload(req, res,  (err: any) => {
        if (err) {
            next(err);
        }

        const filePath = req.file.path;

        const fileExt = extname(req.file.originalname).toLowerCase();

        if (fileExt === ".png" || fileExt === ".jpg") {
            req.uploaded_file_url = filePath;
            next();
        } else {
            return unlink(filePath, err => {
                if (err) return res.status(400).send(createResponseBody(400, { error: err }))

                return res.status(400).send(createResponseBody(400, { error: "Only png files are allowed" }));
            });
        }
    });
};
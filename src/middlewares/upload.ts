import multer from 'multer'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs';
import { readFile, unlink } from "fs/promises";
import { extname } from 'path'
import { createResponseBody } from '../utils/RequestUtils'
import { uploadImageToS3 } from '../utils/AWSWrapper'

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public";
    fs.access(dir, err => {
      if (err && err.code === "ENOENT") {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname));
  }
})

const multerUpload = multer({ storage: multerStorage }).single('file')

export const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  multerUpload(req, res, async (err: any) => {
    console.log("Upload started.");
    if (err) {
      console.log(err);
      return next(err);
    }

    const filePath = req.file.path;
    const fileExt = extname(req.file.originalname).toLowerCase();
    
    let fileUrl = "";

    try {
      const file = await readFile(req.file.path);

      if (![".png", ".jpg", ".jpeg"].includes(fileExt)) {
        await unlink(filePath);
        return res.status(400).send(createResponseBody(400, { error: 'Only png/jpg/jpeg files are allowed' }))
      }

      fileUrl = await uploadImageToS3(file, fileExt);
      req.uploaded_file_url = fileUrl;
      
      await unlink(filePath);
      return next();

    } catch(err) {
      return next(err);
    }
  })
}

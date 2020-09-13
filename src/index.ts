require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import apiRouter from "./routes";
import {initDB} from "./db";
import {signJWT, TokenType} from "./utils/JWTUtils";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', apiRouter);
app.get('/health-check', (req, res, next) => res.send("Hey!"));

const PORT = process.env.PORT || 8080;

initDB()
.then(() => {
   app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
   });
})
.catch(err => console.log("Failed to establish database connection.", err));
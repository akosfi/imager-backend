import * as path from "path";

require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';

import apiRouter from "./routes";
import {initDB} from "./db";

const corsOptions: CorsOptions= {
    origin: process.env.CLIENT_APP,
    credentials: true
}

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', apiRouter);

export default app;
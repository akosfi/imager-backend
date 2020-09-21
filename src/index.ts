import * as path from "path";

require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';

import apiRouter from "./routes";
import {initDB} from "./db";

const corsOptions: CorsOptions= {
   origin: process.env.CLIENT_APP
}

const app = express();

console.log(path.join(__dirname, '../public'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, '../public')));
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
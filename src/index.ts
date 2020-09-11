import express from "express";
import bodyParser from "body-parser";

import apiRouter from "./routes";

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
   console.log(`Server is listening on port: ${PORT}`);
});

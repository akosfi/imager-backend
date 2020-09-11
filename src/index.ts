import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes";
import db from "./db";

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 8080;

db
.authenticate()
.then(() => {
   app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
   });
})
.catch(err => console.log("Failed to establish database connection.", err));
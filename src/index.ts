import app from "./app";
import {initDB} from "./db";

const PORT = process.env.PORT || 8080;

console.log("Heyyyyyyy");

initDB()
    .then(() => {
       app.listen(PORT, () => {
          console.log(`Server is listening on port: ${PORT}`);
       });
    })
    .catch(err => console.log("Failed to establish database connection.", err));
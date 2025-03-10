// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";

import { connectDB } from "./db/index.js";
import { app } from "./app.js";

// dotenv.config({
//   path: "../env",
// });
dotenv.config();

/* 1st Approach to connect to DB8 */

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server listening on port " + process.env.PORT);
    });

    app.on("Error", (err) => {
      console.log("ERR !!:", err);
      throw err;
    });
  })
  .catch((err) => {
    console.log("Mongo db connection Failed: !!" + err);
  });


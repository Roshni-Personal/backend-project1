// require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";

import { connectDB } from "./db/index.js";

dotenv.config({
  path: "../env",
});
// dotenv.config();

/* 1st Approach to connect to DB8 */

connectDB();

/* 2nd Approach to connect to DB

import express from "express";

const app = express();

// FFI - Immediate function execution, semicolon at the start is for cleaning purposes.
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("Error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log("app is listening on port " + process.env.PORT);
    });
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
})();
*/

import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`
    );
    console.log(
      "\n Mongo DB connection established, DB_HOST:",
      connectionInstance
    );
    console.log(
      ` \n Mongo DB connection established, DB_HOST: ${connectionInstance.connection.host} `
    ); //to check for corrrect host
  } catch (err) {
    console.log("Mongodb connection FAILED: ", err);
    process.exit(1);
  }
};

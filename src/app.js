import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use() method is used for all the middleware or configurations
// app.use()(cors());
// there are other settings for cors , read documentation for that, for now this much is enough
app.use()(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// To set configuration, set middleware
// 1. To set the limit of incoming json data
app.use(express.json({ limit: "16kb" }));
// 2. To encode the url for special symbols , like for "space" it has "%20"
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// 3. to create a static file "public" which will have all static resources
app.use(express.static("public"));
// 4. To perform crud operations of cookies on website
app.use(cookieParser());

export { app };

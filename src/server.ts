// import express from "express";
// import http from "http";
// import bodyParser from "body-parser"

// import cors from "cors"

// const app = express();

import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
console.log("starting server.......>>>>")
dotenv.config();

const MONGODB_URI = process.env.MONGODB_TEST_STRING as string;
if (!MONGODB_URI) {
    console.error("MONGODB_URI not defined in .env file");
    process.exit(1);
  }

  console.log("Attempting to connect to MongoDB with URI:", MONGODB_URI);
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log(MONGODB_URI)
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`server is correctly running on port: ${PORT}`)
        });
        console.log('MongoDB connected')
    })
    .catch(() => {
        console.error("error connecting to database")
    });



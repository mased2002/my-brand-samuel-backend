// import express from "express";
// import http from "http";
// import bodyParser from "body-parser"

// import cors from "cors"

// const app = express();

import app from "./app";
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_TEST_STRING as string;
console.log("this is the string:"+ MONGODB_URI)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        const PORT = 8080;
        app.listen(PORT, () => {
            console.log(`server is correctly running on port: ${PORT}`)
        });
        console.log('MongoDB connected')
    })
    .catch(() => {
        console.error("error connecting to database")
    });



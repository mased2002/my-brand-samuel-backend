"use strict";
// import express from "express";
// import http from "http";
// import bodyParser from "body-parser"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cors from "cors"
// const app = express();
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
console.log("starting server.......>>>>");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error("MONGODB_URI not defined in .env file");
    process.exit(1);
}
console.log("Attempting to connect to MongoDB with URI:", MONGODB_URI);
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log(MONGODB_URI);
    const PORT = 8080;
    app_1.default.listen(PORT, () => {
        console.log(`server is correctly running on port: ${PORT}`);
    });
    console.log('MongoDB connected');
})
    .catch(() => {
    console.error("error connecting to database");
});

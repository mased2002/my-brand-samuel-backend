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
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    const PORT = 8000;
    app_1.default.listen(PORT, () => {
        console.log(`server is correctly running on port: ${PORT}`);
    });
    console.log('MongoDB connected');
})
    .catch(() => {
    console.error("error connecting to database");
});

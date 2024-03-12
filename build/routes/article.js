"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_1 = __importDefault(require("../middleware/article"));
const article_2 = require("../controllers/article");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const articleRoute = (0, express_1.Router)();
const upload = (0, multer_1.default)();
articleRoute.post("/create", upload.single('image'), article_1.default, article_2.articleControl.createArticle);
// articleRoute.post("/upload", upload.single('image'), articleControl.uploadImage)
articleRoute.get("/getAll", article_2.articleControl.getAllArticles);
articleRoute.get("/:id", auth_1.isLoggedIn, article_2.articleControl.getOneArticle);
articleRoute.patch("/:id", auth_1.isLoggedIn, article_1.default, article_2.articleControl.updateArticle);
articleRoute.delete("/:id", auth_1.isLoggedIn, article_2.articleControl.DeleteArticle);
exports.default = articleRoute;

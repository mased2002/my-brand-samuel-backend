"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    Content: { type: String, required: true },
}, {
    timestamps: true,
});
const ArticleModel = (0, mongoose_1.model)("Article", articleSchema);
exports.default = ArticleModel;

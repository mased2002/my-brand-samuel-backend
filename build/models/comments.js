"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    onBlog: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const CommentModel = (0, mongoose_1.model)("comment", commentSchema);
exports.default = CommentModel;

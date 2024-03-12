"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const comments_2 = require("../middleware/comments");
const auth_1 = require("../middleware/auth");
const commentRoute = (0, express_1.Router)();
commentRoute.post("/create", comments_2.validateComment, comments_1.commentControl.createComment);
commentRoute.get("/getAll", comments_1.commentControl.getAllComments),
    // commentRoute.get("/approved", commentControl.getCommentApproved)
    commentRoute.patch("/:id", auth_1.isLoggedIn, comments_1.commentControl.updateComment);
commentRoute.delete("/:id", auth_1.isLoggedIn, comments_1.commentControl.deleteComment);
exports.default = commentRoute;

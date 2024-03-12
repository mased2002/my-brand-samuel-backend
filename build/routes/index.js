"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("./messages"));
const article_1 = __importDefault(require("./article"));
const comments_1 = __importDefault(require("./comments"));
const project_1 = __importDefault(require("./project"));
const Users_1 = __importDefault(require("./Users"));
exports.default = {
    article: article_1.default,
    comment: comments_1.default,
    project: project_1.default,
    message: messages_1.default,
    user: Users_1.default
};

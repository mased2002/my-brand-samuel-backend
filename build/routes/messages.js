"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const messages_1 = __importDefault(require("../middleware/messages"));
const auth_1 = require("../middleware/auth");
const messageRoute = (0, express_1.Router)();
messageRoute.post("/create", auth_1.isLoggedIn, messages_1.default, message_1.messageControl.createMessage);
messageRoute.get("/getAll", auth_1.isLoggedIn, message_1.messageControl.getAllMessages);
messageRoute.get("/:id", auth_1.isLoggedIn, message_1.messageControl.getOneMessage);
messageRoute.delete("/:id", auth_1.isLoggedIn, message_1.messageControl.deleteMessage);
exports.default = messageRoute;

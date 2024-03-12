"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageControl = void 0;
const messages_1 = __importDefault(require("../models/messages"));
const http_status_1 = require("http-status");
class MessageController {
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, content } = req.body;
                const newMessage = yield messages_1.default.create(Object.assign({}, req.body));
                return res
                    .status(http_status_1.CREATED)
                    .json({ newMessage, message: "message created" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield messages_1.default.find({});
                return res
                    .status(http_status_1.OK)
                    .json({ messages, message: "these are all the messages" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getOneMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const Message = yield messages_1.default.findById(id);
                return res
                    .status(http_status_1.OK)
                    .json({ Message, message: `the message that was caught` });
            }
            catch (error) {
                return res
                    .status(404)
                    .json({ error: error.message });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const messageToDelete = yield messages_1.default.findById(id);
                if (!messageToDelete) {
                    return res.status(http_status_1.NOT_FOUND).json({ message: "message not found!" });
                }
                yield messages_1.default.findByIdAndDelete(id);
                return res
                    .status(http_status_1.OK)
                    .json({ message: "message to delete is this" + messageToDelete._id });
            }
            catch (error) {
            }
        });
    }
}
exports.messageControl = new MessageController();

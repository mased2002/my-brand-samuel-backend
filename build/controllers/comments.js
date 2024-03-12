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
exports.commentControl = void 0;
const comments_1 = __importDefault(require("../models/comments"));
const http_status_1 = require("http-status");
class CommentController {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, content, onBlog } = req.body;
                const newComment = yield comments_1.default.create(Object.assign({}, req.body));
                return res
                    .status(http_status_1.CREATED)
                    .json({ newComment, message: "comment created" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comments_1.default.find({});
                return res
                    .status(http_status_1.OK)
                    .json({ comments, message: "these are all the comments" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getOneCOmment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comment = yield comments_1.default.findById(id);
                return res.status(http_status_1.OK).json({ comment, message: "the comment you wanted " });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateComment = yield comments_1.default.findByIdAndUpdate(id, { approved: true }, { new: true });
                // Filter out comments that are approved
                return res
                    .status(http_status_1.OK)
                    .json({ updateComment, message: "comment apporved" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "comment doesn't exist" });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedComment = yield comments_1.default.findByIdAndDelete(id);
                if (deletedComment) {
                    return res
                        .status(http_status_1.OK)
                        .json({ message: "comment successfuly deleted", deletedComment });
                }
                else {
                    return res
                        .status(404).json({ message: "message not found or invalid id" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
}
exports.commentControl = new CommentController();

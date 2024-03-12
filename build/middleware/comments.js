"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateComment = exports.validateComment = void 0;
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    onBlog: joi_1.default.string().required(),
    approved: joi_1.default.boolean()
});
const updateComentSchema = joi_1.default.object({
    name: joi_1.default.string(),
    content: joi_1.default.string(),
    approved: joi_1.default.boolean()
});
function validateComment(req, res, next) {
    const validationResult = commentSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message, message: "missing field in comment" });
    }
    // if error is not there
    next();
}
exports.validateComment = validateComment;
function validateUpdateComment(req, res, next) {
    const validationResult = updateComentSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    // if error is not there
    next();
}
exports.validateUpdateComment = validateUpdateComment;

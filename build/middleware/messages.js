"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const messageschema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    content: joi_1.default.string().required()
});
function validateMessage(req, res, next) {
    const validationResult = messageschema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message, message: "message missing fields" });
    }
    // if no error is found
    next();
}
exports.default = validateMessage;

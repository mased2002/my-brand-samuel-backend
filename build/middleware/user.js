"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegistiration = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    username: joi_1.default.string(),
    role: joi_1.default.number()
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required()
});
function validateRegistiration(req, res, next) {
    const validationResult = registerSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    // if error is not there
    next();
}
exports.validateRegistiration = validateRegistiration;
function validateLogin(req, res, next) {
    const validationResult = loginSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }
    // if error is not there
    next();
}
exports.validateLogin = validateLogin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const articleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    image: joi_1.default.string(),
    Content: joi_1.default.string().required(),
});
// function for validating article data
function validateArticle(req, res, next) {
    const validationResult = articleSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message, message: "might have missed a field or your fields are not strings" });
    }
    // if(!req.file){
    //     return res.status(400).json({message: "nofile was provided"})
    // }else{
    // }
    // if the error is not there 
    next();
}
exports.default = validateArticle;

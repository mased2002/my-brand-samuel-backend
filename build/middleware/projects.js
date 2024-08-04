"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = void 0;
const joi_1 = __importDefault(require("joi"));
const projectSchema = joi_1.default.object({
    projectTitle: joi_1.default.string().required(),
    projectImg: joi_1.default.string().required(),
    projectDescription: joi_1.default.string().required(),
    projectTechs: joi_1.default.array().required(),
    projectLink: joi_1.default.string().required(),
    projectCodeLink: joi_1.default.string()
});
// const UpdateProjectSchema = Joi.object({
//     projectTitle: Joi.string(),
//     projectImg: Joi.string(),
//     projectDescription: Joi.string(),
//     projectTechs: Joi.array()
// })
function validateProject(req, res, next) {
    const validationResult = projectSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message, message: "probably missing some fields or missed matched them" });
    }
    // if error is not there
    next();
}
exports.validateProject = validateProject;

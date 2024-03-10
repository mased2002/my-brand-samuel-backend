import Joi, { ValidationResult } from "joi";
import { Response, Request, NextFunction } from "express";
import ArticleModel from "../models/article";

const articleSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    image: Joi.string().required(),
    Content: Joi.string().required(),
});

// function for validating article data
function validateArticle(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = articleSchema.validate(req.body);

    if (validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message, message: "might have missed a field or your fields are not strings"})
    }

    // if the error is not there 
    next();
}
export default validateArticle 
import Joi, { ValidationResult } from "joi";
import { Response, Request, NextFunction } from "express";
import CommentModel from "../models/comments";

const commentSchema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required(),
    approved: Joi.boolean().required()
})

const updateComentSchema = Joi.object({
    name: Joi.string(),
    content: Joi.string(),
    approved: Joi.boolean()
})

function validateComment(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = commentSchema.validate(req.body)

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message})
    }
    // if error is not there

    next();
}

function validateUpdateComment(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = updateComentSchema.validate(req.body)

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message})
    }
    // if error is not there

    next();
}

export {validateComment, validateUpdateComment}
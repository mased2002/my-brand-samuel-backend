import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";

const messageschema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    content: Joi.string().required()
})

function validateMessage(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = messageschema.validate(req.body)

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message, message: "message missing fields"})
    }
    // if no error is found

    next();
}

export default validateMessage;
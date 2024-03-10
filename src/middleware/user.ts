import { compare, hash } from "bcrypt";
import Joi, { ValidationResult } from "joi";
import * as jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string(),
    role: Joi.number()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export  function validateRegistiration(req: Request, res: Response , next: NextFunction){
    const validationResult: ValidationResult = registerSchema.validate(req.body)

    if (validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message})
    }
    // if error is not there

    next();
}

export  function validateLogin(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = loginSchema.validate(req.body)

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message});
    }
    // if error is not there

    next();
}



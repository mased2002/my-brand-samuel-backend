import { compare, hash } from "bcrypt";
import Joi, { ValidationResult } from "joi";
import * as jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().required()
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

export function isLoggedIn(req: Request, res: Response, next: NextFunction){
    // const token = req.headers.authorization?.split(' ')[1];
    let token: string = req.headers.authorization as string
    if (token && token.startsWith("Bearer ")){
        token = token.split(" ")[1]
    }else{
        return res.status(403).json({message: "No token provided"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error, decoded) => {
        if(error){
            console.error("verification failed should signup:", error);
            return;
        }
        console.log("jwt decoded", decoded);

        next();
    });
}

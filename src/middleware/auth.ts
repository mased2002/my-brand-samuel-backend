import * as jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express";
dotenv.config()


// import UserModel from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET_KEY as string

export function createToken(user: any){
    return jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "30d"})
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction){
    // const token = req.headers.authorization?.split(' ')[1];
    let token: string = req.headers.authorization as string
    if (token && token.startsWith("Bearer ")){
        token = token.split(" ")[1]
    }else{
        return res.status(403).json({message: "No token provided"})
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if(error){
            console.error("verification failed should signup:", error);
            return;
        }
        console.log("jwt decoded", decoded);

        next();
    });
}


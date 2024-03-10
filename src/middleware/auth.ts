import * as jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
dotenv.config()

const routes = {
    "admin": 2203,
    "user": 1124,
    "guest": 1000
}
// import UserModel from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET_KEY as string

export function createToken(user: any){
    return jwt.sign({_id: user._id, role: user.role}, JWT_SECRET, {expiresIn: "30d"})
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction){
    // const token = req.headers.authorization?.split(' ')[1];
    let token: string = req.headers.authorization as string
    if (token && token.startsWith("Bearer ")){
        token = token.split(" ")[1]
    }else{
        return res.status(403).json({message: "No bearer token provided"})
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if(error){
            console.error("verification failed should signup:", error);
            return res
            .status(401)
            .json({message: "unathorized should singup"})
        }
        console.log("jwt decoded", decoded);

        // Attach user role to the decoded object
        next();
    });
}
// export function isAdmin(req: Request, res: Response, next: NextFunction){
//     let token: string = req.headers.authorization as string
//     if(toke
// }
export function isAdmin( req: Request, res: Response, next: NextFunction){
    let token: string = req.headers.authorization as string
    if (token && token.startsWith("Bearer ")){
        token = token.split(" ")[1]
    }else{
        return res.status(403).json({message: "No bearer token provided"})
    }

    jwt.verify(token, JWT_SECRET, (error, decoded: any) => {
        if(error){
            console.error("verification failed should signup:", error);
            return res
            .status(401)
            .json({message: "unathorized should singup"})
        }
        // check if the decoded object includes the role of admin
        if(decoded && decoded.role === 2203){
            // user has admin privileges, proceed
            next();
        }else{
            // user does not have admin priveleges
            return res.status(403).json({message: "User is not authorized admin"})
        }
        // Attach user role to the decoded object
    });
}
// export function makeAdmin(req: Request, res: Response, next: NextFunction){
//     const user = 
// }


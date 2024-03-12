"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLoggedIn = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes = {
    "admin": 2203,
    "user": 1124,
    "guest": 1000
};
// import UserModel from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET_KEY;
function createToken(user) {
    return jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "30d" });
}
exports.createToken = createToken;
function isLoggedIn(req, res, next) {
    // const token = req.headers.authorization?.split(' ')[1];
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    else {
        return res.status(403).json({ message: "No bearer token provided" });
    }
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            console.error("verification failed should signup:", error);
            return res
                .status(401)
                .json({ message: "unathorized should singup" });
        }
        console.log("jwt decoded", decoded);
        // Attach user role to the decoded object
        next();
    });
}
exports.isLoggedIn = isLoggedIn;
// export function isAdmin(req: Request, res: Response, next: NextFunction){
//     let token: string = req.headers.authorization as string
//     if(toke
// }
function isAdmin(req, res, next) {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    else {
        return res.status(403).json({ message: "No bearer token provided" });
    }
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            console.error("verification failed should signup:", error);
            return res
                .status(401)
                .json({ message: "unathorized should singup" });
        }
        // check if the decoded object includes the role of admin
        if (decoded && decoded.role === 2203) {
            // user has admin privileges, proceed
            next();
        }
        else {
            // user does not have admin priveleges
            return res.status(403).json({ message: "User is not authorized admin" });
        }
        // Attach user role to the decoded object
    });
}
exports.isAdmin = isAdmin;
// export function makeAdmin(req: Request, res: Response, next: NextFunction){
//     const user = 
// }

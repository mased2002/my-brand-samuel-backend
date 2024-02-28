import * as jwt  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


// import UserModel from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET_KEY as string

function createToken(user: any){
    return jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "30d"})
}

export default createToken;
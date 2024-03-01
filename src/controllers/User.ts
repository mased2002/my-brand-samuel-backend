import UserModel from "../models/User";
import { Request, Response, NextFunction } from "express";
import { CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt"
import { createToken } from "../middleware/auth";
class UserControler{
    async createUser(req: Request, res: Response){
        try {
            const {name, email, password, username} = req.body
            const hashedPass = await bcrypt.hash(password, 10)
            const user = await UserModel.create({...req.body, password: hashedPass})

            return res
                .status(CREATED)
                .json(user)
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message, message: "this is an error cause the body is not specified"})
        }
    }
    async getAllUsers(req: Request, res: Response){
        try {
            const users = await UserModel.find({})

            return res
                .status(OK)
                .json({users, message: "these are all the users"})
        } catch (error: unknown) {
            return res 
                .status(INTERNAL_SERVER_ERROR)
                .json(error)
        }
    }
    async deleteUser(req: Request, res: Response){
        try {
            const { email } = req.params
            const userToDelete = await UserModel.findOne({ email })
            if(!userToDelete){
                return res
                    .status(NOT_FOUND)
                    .json({message: "User Not found"})
            }

            const userDeleted = await UserModel.deleteOne({ email })
            return res  
                .status(OK)
                .json({userDeleted, message: "user deleted successfully"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json(error)
        }
    }
    async loginUser(req: Request, res: Response){
        try {
            const { email, password } = req.body 


            const user = await UserModel.findOne({ email })

            if(email !== user?.email){
                return res.status(404).json({message: "user email not found"})
            }
           
            if(!user){
                return res.status(404).json({message: "User not Found"})
            }

            if(!user.password){
                return res
                    .status(404)
                    .json({message: "user does not contain password"})
            }
                const passwordMatch = await bcrypt.compare(password, user.password)
                if(!passwordMatch){
                    return res
                        .status(404)
                        .json({message: "password doesn't match"})
                }else{
                    const token = createToken(user)
                    // req.headers.authorization = token + " samuel is EEEEEEEEEEE"
                    // console.log(req.headers.authorization)
                    // const sam = req.headers.authorization.split(" ")[1]

                    return res
                        .status(OK)
                        .json({message: "password is a match and you are LoggedIn", token})
                }
            

            // const passwordMatch = await bcrypt.compare(password, )

            return res
                .status(OK)
                .json({user, message: "this is the user that logged in"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json(error)
        }
    }
}

export const userControl = new UserControler();
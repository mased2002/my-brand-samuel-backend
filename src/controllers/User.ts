import UserModel from "../models/User";
import { Request, Response, NextFunction } from "express";
import { CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";
import { StatusCodes } from "http-status-codes";
import { Hash } from "crypto";
import bcrypt, { hash } from "bcrypt";
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
}

export const userControl = new UserControler();
import UserModel from "../models/User";
import { Request, Response, NextFunction } from "express";
import { CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt"
import { createToken, isAdmin } from "../middleware/auth";
class UserControler{
    async createUser(req: Request, res: Response){
        try {
            const {name, email, password, username} = req.body
            const hashedPass = await bcrypt.hash(password, 10)
            const existingEmail = await UserModel.findOne({email})
            if(existingEmail){
                return res
                    .status(404)
                    .json({message: "seems user already exist"})
            } else{
                const user = await UserModel.create({...req.body, password: hashedPass})

                return res
                    .status(CREATED)
                    .json({user, message: "user created successfuly"})
        }
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message, message: "this is an error cause the body is not specified"})
        }
    }
    async getAllUsers(req: Request, res: Response){
        try {
            console.log("users is working")
            const users = await UserModel.find({});

            return res
                .status(OK)
                .json({users, message: "these are all the users"})
        } catch (error: unknown) {
            console.log("users dead")
            return res 
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message, message: "something wrong with getting users"})
        }
    }
    async getOneUser(req: Request, res: Response){
        try {
            const { id } = req.params 
            const user = await UserModel.findOne({ id })
            return res
                .status(200)
                .json({user, message: "user found"})

        } catch (error) {
            return res
                .status(404)
                .json({message: "couldn't find user"})
        }
    }
    async updateUserRoles(req: Request, res: Response){
        try {
            const { id } = req.params
            const user = await UserModel.findById( id )
            if(!user){
                return res.status(404).json({mesage: "oops user not found"})
            }else{
                user.role = 2203
                await user.save();
                // const Admin = isAdmin(user)
                // if(Admin == "is admin"){
                //     return res.status(200).json({message: "user is already admin"})
                // }else{
                //     const {role} = req.body
                //     const userUpdate = await UserModel.findByIdAndUpdate(id, {...req.body})
                //     return res
                //         .status(OK)
                //         .json({user, message: "role made admin" })
                // }
                return res.status(200).json({user, message: "user updated to admin"})
            }

        } catch (error: any) {
            return res.
            status(500)
            .json({error:(error as Error).message, message: "id must be objectid or something else is wrong"})
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
            if(!user){
                return res.status(404).json({message: "User not Found"})
            }

            // if(email !== user.email){
            //     return res.status(404).json({message: "user email not found"})
            // }
           


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

                    return res
                        .status(OK)
                        .json({message: "password is a match and you are LoggedIn", token})
                }
            


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
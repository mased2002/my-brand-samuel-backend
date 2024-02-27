import MessageModel from "../models/messages";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";

class MessageController{
    async createMessage(req: Request, res: Response){
        try {
            const {name, email, content} = req.body;
            const newMessage = await MessageModel.create({...req.body})

            return res
            .status(CREATED)
            .json({newMessage, message: "message created"})
        } catch (error: unknown) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async getAllMessages(req: Request, res: Response){
        try {
            const messages = await MessageModel.find({});

            return res
            .status(OK)
            .json({messages, message: "these are all the messages"})
        } catch (error: unknown) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async getOneMessage(req: Request, res: Response){
        try {
            const { id } = req.params
            const Message =  await MessageModel.findById(id)

            return res
            .status(OK)
            .json({Message, message: `the message that was caught`})
        } catch (error: unknown) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async deleteMessage(req: Request, res: Response){
        try {
            const { id } = req.params
            const messageToDelete = await MessageModel.findById(id)
            if(!messageToDelete){
                return res.status(NOT_FOUND).json({message: "message not found!"})
            }

            await MessageModel.findByIdAndDelete(id)

            return res
                .status(OK)
                .json({message: "message to delete is this" + messageToDelete._id})

        } catch (error: unknown) {
            
        }
    }
}

export const messageControl = new MessageController();
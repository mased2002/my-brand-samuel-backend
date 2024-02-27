

import CommentModel from "../models/comments";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CREATED, OK, INTERNAL_SERVER_ERROR } from "http-status";
import { Err } from "joi";

class CommentController{
    async createComment(req: Request, res: Response){
        try {
            const {name, content} = req.body;
            const newComment = await CommentModel.create({...req.body})

            return res
            .status(CREATED)
            .json({newComment, message: "message created"})
        } catch (error: unknown) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async getAllComments(req: Request, res: Response){
        try {
            const comments = await CommentModel.find({});

            return res
            .status(OK)
            .json({comments, message: "these are all the messages"})
        } catch (error: unknown) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async getOneCOmment(req: Request, res: Response){
        try {
            const { id } = req.params
            const comment = await CommentModel.findById(id)

            return res.status(OK).json({comment, message: "the comment you wanted "})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    async updateComment(req: Request, res: Response){
        try {
            const { id } = req.params
            const updateComment = await CommentModel.findByIdAndUpdate(id, {approved: true}, {new: true})


            // Filter out comments that are approved

            return res
                .status(OK)
                .json({updateComment, message: "this the comments came from the update"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    async deleteComment(req: Request, res: Response){
        try {
            const { id } = req.params
            const deletedComment = await CommentModel.findByIdAndDelete(id)
            if (deletedComment){
                return res
                    .status(OK)
                    .json({message: "the deleted message", deletedComment})
            }else{
                return res
                    .status(404).json({message: "message not found or invalid id"})
            }
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    // async getCommentApproved(req: Request, res: Response){
    //     try {
            
    //         const comments = await CommentModel.find({})
    //         const comment = comments.filter(com =>{
    //             return com.approved === false
    //         })

    //         return res
    //             .status(OK).json({comment, message: "the comment that is approved"})
    //     } catch (error: unknown) {
    //         return res
    //             .status(INTERNAL_SERVER_ERROR)
    //             .json({error: (error as Error).message})
    //     }
    // }
    // async aproveComment(req: Request, res: Response){
    //     try {
    //         const { id } = req.params
    //     } catch (error: unknown) {
    //         return res
    //             .status(INTERNAL_SERVER_ERROR)
    //             .json({error: (error as Error).message})
    //     }
    // }
}

export const commentControl = new CommentController();
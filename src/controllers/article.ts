// import app from "src/app";
import ArticleModel from "../models/article";
import { Request, Response, NextFunction, request } from "express";
import { StatusCodes } from "http-status-codes";
import { CREATED, OK, INTERNAL_SERVER_ERROR } from "http-status";


class ArticleController{
    async createArticle(req: Request, res: Response){
        try {
        const {title, description, author, image, Content} = req.body;
        const newArticle = (await ArticleModel.create({...req.body}))
        
        return res
        .status(CREATED)
        .json({newArticle, message: "this is actually working"  })
    }catch (error: unknown){
        return res
        .status(INTERNAL_SERVER_ERROR)
        .json({error: (error as Error).message})
    }
    }
    async getAllArticles(req: Request, res: Response){
        try{
        const articles = await ArticleModel.find({});

        return res
            .status(OK)
            .json({articles, message: "All articles"})
        
    }catch(error: unknown){
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
    }
}

    async getOneArticle(req: Request, res: Response){
        try {
            const { id } = req.params
            const Article = await ArticleModel.findById(id)

            return res.status(OK).json({Article, message: `article fetched by id ${Article?.title}` })
        } catch (error) {
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async updateArticle(req: Request, res: Response){
        try{
            const { id } = req.params
            const {title, description, author, image, Content} = req.body;

            const updatedArticle = await ArticleModel.findByIdAndUpdate(id, { ...req.body });
            return res
                .status(OK)
                .json({ updatedArticle, message: "Successfully Updated" });
        }catch (error){
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
    async DeleteArticle(req: Request, res: Response){
        try{
            const {id} = req.params;

            // check if article exits
            const articleToDelete = await ArticleModel.findById(id)
            if(!articleToDelete){
                return res.status(StatusCodes.NOT_FOUND).json({error: "article not found sorry"})
            }

            await ArticleModel.findByIdAndDelete(id)

            return res
                .status(OK)
                .json({message: `the article was deleted of id: ${articleToDelete.id}`})

        }catch (error){
            return res
            .status(INTERNAL_SERVER_ERROR)
            .json({error: (error as Error).message})
        }
    }
}

export const articleControl = new ArticleController();


// import app from "src/app";
import ArticleModel from "../models/article";
import { Request, Response, NextFunction, request } from "express";
import { StatusCodes } from "http-status-codes";
import { CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } from "http-status";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { arrayBuffer } from "stream/consumers";

// configure Multer
const upload = multer()

// configure CLoudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// controller function to handle file upload

class ArticleController{
    async createArticle(req: Request, res: Response){
        try {
        const {title, description, author, Content} = req.body;
        // check if file is present in request
        if(!req.file){
            return res.status(BAD_REQUEST).json({message: 'No image upload'})
        }
        const  { buffer, mimetype } = req.file
        let imageUrl : string
        if (mimetype.startsWith('image/')) {
            // If it's an image file, convert buffer to data URL
            imageUrl = `data:${mimetype};base64,${buffer.toString('base64')}`;
        } else {
            return res.status(400).json({ message: 'Unsupported file format' });
        }
        // Upload file to CLoudinary
        const result = await cloudinary.uploader.upload(imageUrl)
        // console.log("image_url: ", imageUrl)
        const newArticle = await ArticleModel.create({...req.body, image: result.secure_url })
            return res
            .status(CREATED)
            .json({newArticle, message: "article created"  })
        // const articles = await ArticleModel.findOne(title)
        // if(articles){
        //     return res.status(409).json({message: "article with that title already exists"})
        // }else{
            
        // }
       
        
       
    }catch (error: unknown){
        return res
        .status(INTERNAL_SERVER_ERROR)
        .json({error: (error as Error).message, message: "this is the message"})
    }
    }
    // async uploadImage(req: Request, res: Response){
    //     try{
    //         if (!req.file) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //           }
    //         // const { buffer } = req.file;
    //         // console.log(buffer);
            
    //         const { buffer, mimetype } = req.file;

    //     let dataUrl: string;
    //     if (mimetype.startsWith('image/')) {
    //         // If it's an image file, convert buffer to data URL
    //         dataUrl = `data:${mimetype};base64,${buffer.toString('base64')}`;
    //     } else {
    //         return res.status(400).json({ message: 'Unsupported file format' });
    //     }
    //         // upload file to cloudinary
    //         const result = await cloudinary.uploader.upload(dataUrl);
    //         return res.status(200).json({imageUrl: result.secure_url})
    //     }catch(error: any){
    //         console.error('Error uploading image.', error);
    //         return res.status(500).json({message: "failed to upload image"})
    //     }
    // }
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
            .json({error: (error as Error).message, message: "article doesnt exist"})
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
            // check if id exists
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(403).json({ error: "Invalid article ID" });
            }

            // check if article exits
            const articleToDelete = await ArticleModel.findById(id)
            if(!articleToDelete){
                return res.status(403).json({error: "article not found sorry"})
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


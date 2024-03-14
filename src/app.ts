import express, { Application, Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';
import { articleControl } from './controllers/article';
import { CREATED, OK } from "http-status";
import ArticleModel from './models/article';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();


// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(express.json());




app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "welcome to your first api"})
});


// app.post("/api/articles/create", async (req: Request, res: Response) => {
//     // Your article creation logic here
//     const {title, description, author, image, Content} = req.body;
//     const newArticle = await ArticleModel.create({...req.body})
//     return res
//     .status(CREATED)
//     .json({newArticle, message: "this is my api"})
// });
app.use("/api/articles", routes.article)
app.use("/api/messages", routes.message)
app.use("/api/comments", routes.comment)
app.use("/api/projects", routes.project)
app.use("/api/users", routes.user)


export default app;
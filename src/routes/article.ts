import { Router } from "express";
import validateArticle from "../middleware/article";
import { articleControl } from "../controllers/article";
import {isLoggedIn, isAdmin} from "../middleware/auth"
import multer from "multer";
const articleRoute = Router();
const upload = multer();


articleRoute.post("/create",  upload.single('image'), validateArticle, articleControl.createArticle)
// articleRoute.post("/upload", upload.single('image'), articleControl.uploadImage)
articleRoute.get("/getAll",  articleControl.getAllArticles)
articleRoute.get ("/:id", isLoggedIn, articleControl.getOneArticle)
articleRoute.patch("/:id", isLoggedIn, validateArticle, articleControl.updateArticle)
articleRoute.delete("/:id", isLoggedIn, articleControl.DeleteArticle)

export default articleRoute;
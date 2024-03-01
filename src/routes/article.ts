import { Router } from "express";
import validateArticle from "../middleware/article";
import { articleControl } from "../controllers/article";
import {isLoggedIn} from "../middleware/auth"
const articleRoute = Router();

articleRoute.post("/create", isLoggedIn, validateArticle, articleControl.createArticle)
articleRoute.get("/getAll",  articleControl.getAllArticles)
articleRoute.get ("/:id", articleControl.getOneArticle)
articleRoute.patch("/:id", isLoggedIn, validateArticle, articleControl.updateArticle)
articleRoute.delete("/:id", isLoggedIn, articleControl.DeleteArticle)

export default articleRoute;
import { Router } from "express";
import validateArticle from "../middleware/article";
import { articleControl } from "../controllers/article";

const articleRoute = Router();

articleRoute.post("/create", validateArticle, articleControl.createArticle)
articleRoute.get("/getAll", articleControl.getAllArticles)
articleRoute.get ("/:id", articleControl.getOneArticle)
articleRoute.patch("/:id", validateArticle, articleControl.updateArticle)
articleRoute.delete("/:id", articleControl.DeleteArticle)

export default articleRoute;
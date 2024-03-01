import { Router } from "express";
import { commentControl } from "../controllers/comments";
import { validateComment, validateUpdateComment } from "../middleware/comments";
import { isLoggedIn } from "../middleware/auth";
const commentRoute = Router()

commentRoute.post("/create", commentControl.createComment)
commentRoute.get("/getAll", commentControl.getAllComments),
// commentRoute.get("/approved", commentControl.getCommentApproved)
commentRoute.post("/:id/update", isLoggedIn, commentControl.updateComment)

export default commentRoute;
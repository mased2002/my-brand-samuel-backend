import { Router } from "express";
import { commentControl } from "../controllers/comments";
import { validateComment, validateUpdateComment } from "../middleware/comments";
const commentRoute = Router()

commentRoute.post("/create", commentControl.createComment)
commentRoute.get("/getAll", commentControl.getAllComments),
// commentRoute.get("/approved", commentControl.getCommentApproved)
commentRoute.post("/:id/update", commentControl.updateComment)

export default commentRoute;
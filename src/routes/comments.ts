import { Router } from "express";
import { commentControl } from "../controllers/comments";
import { validateComment, validateUpdateComment } from "../middleware/comments";
import { isLoggedIn } from "../middleware/auth";
const commentRoute = Router()

commentRoute.post("/create", validateComment, commentControl.createComment)
commentRoute.get("/getAll", commentControl.getAllComments),
// commentRoute.get("/approved", commentControl.getCommentApproved)
commentRoute.patch("/:id", isLoggedIn, commentControl.updateComment)
commentRoute.delete("/:id", isLoggedIn, commentControl.deleteComment)

export default commentRoute;
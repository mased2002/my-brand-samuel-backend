import { Router } from "express";
import { messageControl } from "../controllers/message";
import validateMessage from "../middleware/messages";
import { isLoggedIn } from "../middleware/auth";

const messageRoute = Router();

messageRoute.post("/create", validateMessage,messageControl.createMessage)
messageRoute.get("/getAll", messageControl.getAllMessages)
messageRoute.get("/:id", messageControl.getOneMessage)
messageRoute.post("/:id/delete", isLoggedIn,messageControl.deleteMessage)

export default messageRoute;
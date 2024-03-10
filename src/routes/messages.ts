import { Router } from "express";
import { messageControl } from "../controllers/message";
import validateMessage from "../middleware/messages";
import { isLoggedIn } from "../middleware/auth";

const messageRoute = Router();

messageRoute.post("/create", isLoggedIn, validateMessage,messageControl.createMessage)
messageRoute.get("/getAll", isLoggedIn, messageControl.getAllMessages)
messageRoute.get("/:id", isLoggedIn, messageControl.getOneMessage)
messageRoute.delete("/:id", isLoggedIn,messageControl.deleteMessage)

export default messageRoute;
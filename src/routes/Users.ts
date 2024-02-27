import { Router } from "express";
import { userControl } from "../controllers/User";

const userRoute = Router()

userRoute.post("/signup", userControl.createUser);
userRoute.get("/getAll", userControl.getAllUsers);
userRoute.delete("/:email/delete", userControl.deleteUser);

export default userRoute;
import { Router } from "express";
import { userControl } from "../controllers/User";
import { validateLogin } from "../middleware/user";

const userRoute = Router()

userRoute.post("/signup", userControl.createUser);
userRoute.get("/getAll", userControl.getAllUsers);
userRoute.post("/login", validateLogin,userControl.loginUser);
userRoute.delete("/:email/delete", userControl.deleteUser);

export default userRoute;
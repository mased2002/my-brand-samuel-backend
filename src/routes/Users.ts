import { Router } from "express";
import { userControl } from "../controllers/User";
import { validateLogin } from "../middleware/user";
import { isLoggedIn } from "../middleware/auth";
const userRoute = Router()

userRoute.post("/signup", userControl.createUser);
userRoute.get("/getAll", isLoggedIn,userControl.getAllUsers);
userRoute.post("/login", validateLogin,userControl.loginUser);
userRoute.delete("/:email/delete", isLoggedIn,userControl.deleteUser);

export default userRoute;
import { Router } from "express";
import { userControl } from "../controllers/User";
import { validateLogin } from "../middleware/user";
import { validateRegistiration } from "../middleware/user";
import { isLoggedIn, isAdmin } from "../middleware/auth";
const userRoute = Router()

userRoute.post("/signup", validateRegistiration, userControl.createUser);
userRoute.get("/getall", isLoggedIn,userControl.getAllUsers);
userRoute.post("/login", validateLogin, userControl.loginUser);
userRoute.patch("/:id", isAdmin, userControl.updateUserRoles);
userRoute.get("/:id", isLoggedIn,userControl.getOneUser)
userRoute.delete("/:email", isLoggedIn,userControl.deleteUser);

export default userRoute;
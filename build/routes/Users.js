"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const user_1 = require("../middleware/user");
const user_2 = require("../middleware/user");
const auth_1 = require("../middleware/auth");
const userRoute = (0, express_1.Router)();
userRoute.post("/signup", user_2.validateRegistiration, User_1.userControl.createUser);
userRoute.post("/login", user_1.validateLogin, User_1.userControl.loginUser);
userRoute.get("/getall", auth_1.isLoggedIn, User_1.userControl.getAllUsers);
userRoute.patch("/:id", auth_1.isAdmin, User_1.userControl.updateUserRoles);
userRoute.get("/:id", auth_1.isLoggedIn, User_1.userControl.getOneUser);
userRoute.delete("/:email", auth_1.isLoggedIn, User_1.userControl.deleteUser);
exports.default = userRoute;

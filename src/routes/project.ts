import { Router } from "express";
import { projectControl } from "../controllers/projects";
import { isLoggedIn } from "../middleware/auth";
import {  validateProject } from "../middleware/projects";


const projectRoute = Router()

projectRoute.post("/create", isLoggedIn, validateProject,projectControl.createProject)
projectRoute.get("/getAll", isLoggedIn, projectControl.getAllProjects)
projectRoute.get("/:id", isLoggedIn, projectControl.getProject)
projectRoute.patch("/:id", isLoggedIn ,projectControl.updateProject)
projectRoute.delete("/:id", isLoggedIn, projectControl.deleteProject)

export default projectRoute;
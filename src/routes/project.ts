import { Router } from "express";
import { projectControl } from "../controllers/projects";

import { validateUpdateProject, validateProject } from "../middleware/projects";


const projectRoute = Router()

projectRoute.post("/create", validateProject,projectControl.createProject)
projectRoute.get("/getAll", projectControl.getAllProjects)
projectRoute.get("/:id", validateProject,projectControl.getProject)
projectRoute.patch("/:id", validateUpdateProject,projectControl.updateProject)

export default projectRoute;
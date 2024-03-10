import ProjectModel from "../models/projects";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CREATED, OK, INTERNAL_SERVER_ERROR } from "http-status";

class ProjectController{
    async createProject(req: Request, res: Response) {
        try {
            const {ProjectTitle, ProjectDesciription, projectImg, ProjectTechnologies, projectLink, projectCodeLink} = req.body
            const newProject = await ProjectModel.create({...req.body})

            return res
                .status(CREATED)
                .json({newProject, message:"this is the message"})
        } catch (error: unknown) {
            return res
                .status(500)
                .json({error: (error as Error).message})
        }
    }
    async getAllProjects(req: Request, res: Response){
        try {
            const projects = await ProjectModel.find({})

            return res
                .status(OK)
                .json({projects, message: "this all the projects"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    async getProject(req: Request, res: Response){
        try {
            const { id } = req.params
            const project = await ProjectModel.findById(id)

            return res
                .status(OK)
                .json({project, message: "this is the project selected"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    async updateProject(req: Request, res: Response){
        try {
            const { id } = req.params
            const project = await ProjectModel.findByIdAndUpdate(id, {...req.body})

            return res
                .status(OK)
                .json({project, message: "this is the project to be updated" + project?.projectTitle})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message})
        }
    }
    async deleteProject(req: Request, res: Response){
        try {
            const { id } = req.params
            const projectDelete = await ProjectModel.findByIdAndDelete(id)

            return res
                .status(OK)
                .json({projectDelete, message: "article deleted successfully"})
        } catch (error: unknown) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({error: (error as Error).message, message: "something wrong with deleting the project"})
        }
    }
}

export const projectControl = new ProjectController();
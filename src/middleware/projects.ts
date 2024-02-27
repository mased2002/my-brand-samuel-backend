import Joi, { ValidationResult } from "joi";
import { Response, Request, NextFunction } from "express";
import ProjectModel from "../models/projects";

const projectSchema = Joi.object({
    projectTitle: Joi.string().required(),
    projectImg: Joi.string().required(),
    projectDescription: Joi.string().required(),
    projectTechs: Joi.array().required()
})

const UpdateProjectSchema = Joi.object({
    projectTitle: Joi.string(),
    projectImg: Joi.string(),
    projectDescription: Joi.string(),
    projectTechs: Joi.array()
})

function validateProject(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = projectSchema.validate(req.body)

    if (validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message})
    }
    // if error is not there

    next();
}

function validateUpdateProject(req: Request, res: Response, next: NextFunction){
    const validationResult: ValidationResult = UpdateProjectSchema.validate(req.body)

    if (validationResult.error){
        return res.status(400).json({error: validationResult.error.details[0].message})
    }
    // if error is not there

    next();
}
export  {validateProject, validateUpdateProject}
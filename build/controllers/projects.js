"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectControl = void 0;
const projects_1 = __importDefault(require("../models/projects"));
const http_status_1 = require("http-status");
class ProjectController {
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ProjectTitle, ProjectDesciription, projectImg, ProjectTechnologies, projectLink, projectCodeLink } = req.body;
                const newProject = yield projects_1.default.create(Object.assign({}, req.body));
                return res
                    .status(http_status_1.CREATED)
                    .json({ newProject, message: "this is the message" });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: error.message });
            }
        });
    }
    getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield projects_1.default.find({});
                return res
                    .status(http_status_1.OK)
                    .json({ projects, message: "this all the projects" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield projects_1.default.findById(id);
                return res
                    .status(http_status_1.OK)
                    .json({ project, message: "this is the project selected" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield projects_1.default.findByIdAndUpdate(id, Object.assign({}, req.body));
                return res
                    .status(http_status_1.OK)
                    .json({ project, message: "this is the project to be updated" + (project === null || project === void 0 ? void 0 : project.projectTitle) });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const projectDelete = yield projects_1.default.findByIdAndDelete(id);
                return res
                    .status(http_status_1.OK)
                    .json({ projectDelete, message: "article deleted successfully" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "something wrong with deleting the project" });
            }
        });
    }
}
exports.projectControl = new ProjectController();

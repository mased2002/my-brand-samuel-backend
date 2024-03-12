"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectImg: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectTechs: {
        type: Array,
        required: true
    },
    projectLink: {
        type: String,
        required: true,
        unique: true
    },
    projectCodeLink: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const ProjectModel = (0, mongoose_1.model)("project", projectSchema);
exports.default = ProjectModel;

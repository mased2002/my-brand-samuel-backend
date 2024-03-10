import { array } from "joi";
import { InferSchemaType, Schema, model, Mongoose } from "mongoose";

const projectSchema = new Schema({
    projectTitle:{
        type: String,
        required: true
    },
    projectImg:{
        type: String,
        required: true
    },
    projectDescription:{
        type: String,
        required: true
    },
    projectTechs:{
        type: Array,
        required: true
    },
    projectLink:{
        type: String,
        required: true,
        unique: true
    },
    projectCodeLink:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)
type projectSchemaType = InferSchemaType<typeof projectSchema>

const ProjectModel = model<projectSchemaType>("project", projectSchema)

export default ProjectModel;
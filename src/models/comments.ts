import { InferSchemaType, Schema,  model} from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    onBlog:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

type commentSchemaType = InferSchemaType<typeof commentSchema>

const CommentModel = model<commentSchemaType>("comment", commentSchema)

export default CommentModel;
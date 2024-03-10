import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "mongoose";

const articleSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String, required: true},
    Content: {type: String, required: true},
},
{
    timestamps: true,
}
);
type ArticleSchemaTYpe = InferSchemaType<typeof articleSchema>


 const ArticleModel = model<ArticleSchemaTYpe>("Article", articleSchema);

 export default ArticleModel;
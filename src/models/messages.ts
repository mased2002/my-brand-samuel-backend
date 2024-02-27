import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "mongoose";

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
);
type messageSchemaType = InferSchemaType<typeof messageSchema>

const MessageModel = model<messageSchemaType>("message", messageSchema);

export default MessageModel;
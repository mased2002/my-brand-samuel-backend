import { string } from "joi";
import { NextFunction } from "express";
import { InferSchemaType, Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    username: {
        type: String,
    }
})

type userSchemaType = InferSchemaType<typeof userSchema>

const UserModel = model<userSchemaType>("user", userSchema)

export default UserModel;
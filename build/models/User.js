"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    },
    role: {
        type: Number,
        default: 1124
    }
});
const UserModel = (0, mongoose_1.model)("user", userSchema);
exports.default = UserModel;

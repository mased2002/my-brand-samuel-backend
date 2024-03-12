"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userControl = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_1 = require("http-status");
const bcrypt = __importStar(require("bcrypt"));
const auth_1 = require("../middleware/auth");
class UserControler {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, username } = req.body;
                const hashedPass = yield bcrypt.hash(password, 10);
                const existingEmail = yield User_1.default.findOne({ email });
                if (existingEmail) {
                    return res
                        .status(404)
                        .json({ message: "seems user already exist" });
                }
                else {
                    const user = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPass }));
                    return res
                        .status(http_status_1.CREATED)
                        .json({ user, message: "user created successfuly" });
                }
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "this is an error cause the body is not specified" });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("users is working");
                const users = yield User_1.default.find({});
                return res
                    .status(http_status_1.OK)
                    .json({ users, message: "these are all the users" });
            }
            catch (error) {
                console.log("users dead");
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "something wrong with getting users" });
            }
        });
    }
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findOne({ id });
                return res
                    .status(200)
                    .json({ user, message: "user found" });
            }
            catch (error) {
                return res
                    .status(404)
                    .json({ message: "couldn't find user" });
            }
        });
    }
    updateUserRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ mesage: "oops user not found" });
                }
                else {
                    user.role = 2203;
                    yield user.save();
                    // const Admin = isAdmin(user)
                    // if(Admin == "is admin"){
                    //     return res.status(200).json({message: "user is already admin"})
                    // }else{
                    //     const {role} = req.body
                    //     const userUpdate = await UserModel.findByIdAndUpdate(id, {...req.body})
                    //     return res
                    //         .status(OK)
                    //         .json({user, message: "role made admin" })
                    // }
                    return res.status(200).json({ user, message: "user updated to admin" });
                }
            }
            catch (error) {
                return res.
                    status(500)
                    .json({ error: error.message, message: "id must be objectid or something else is wrong" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const userToDelete = yield User_1.default.findOne({ email });
                if (!userToDelete) {
                    return res
                        .status(http_status_1.NOT_FOUND)
                        .json({ message: "User Not found" });
                }
                const userDeleted = yield User_1.default.deleteOne({ email });
                return res
                    .status(http_status_1.OK)
                    .json({ userDeleted, message: "user deleted successfully" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json(error);
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not Found" });
                }
                // if(email !== user.email){
                //     return res.status(404).json({message: "user email not found"})
                // }
                if (!user.password) {
                    return res
                        .status(404)
                        .json({ message: "user does not contain password" });
                }
                const passwordMatch = yield bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res
                        .status(404)
                        .json({ message: "password doesn't match" });
                }
                else {
                    const token = (0, auth_1.createToken)(user);
                    // req.headers.authorization = token + " samuel is EEEEEEEEEEE"
                    // console.log(req.headers.authorization)
                    // const sam = req.headers.authorization.split(" ")[1]
                    return res
                        .status(http_status_1.OK)
                        .json({ message: "password is a match and you are LoggedIn", token });
                }
                // const passwordMatch = await bcrypt.compare(password, )
                return res
                    .status(http_status_1.OK)
                    .json({ user, message: "this is the user that logged in" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json(error);
            }
        });
    }
}
exports.userControl = new UserControler();

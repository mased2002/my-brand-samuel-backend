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
exports.articleControl = void 0;
// import app from "src/app";
const article_1 = __importDefault(require("../models/article"));
const http_status_1 = require("http-status");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
// configure Multer
const upload = (0, multer_1.default)();
// configure CLoudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// controller function to handle file upload
class ArticleController {
    createArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, author, Content } = req.body;
                // check if file is present in request
                if (!req.file) {
                    return res.status(http_status_1.BAD_REQUEST).json({ message: 'No image upload' });
                }
                const { buffer, mimetype } = req.file;
                let imageUrl;
                if (mimetype.startsWith('image/')) {
                    // If it's an image file, convert buffer to data URL
                    imageUrl = `data:${mimetype};base64,${buffer.toString('base64')}`;
                }
                else {
                    return res.status(400).json({ message: 'Unsupported file format' });
                }
                // Upload file to CLoudinary
                const result = yield cloudinary_1.v2.uploader.upload(imageUrl);
                // console.log("image_url: ", imageUrl)
                const newArticle = yield article_1.default.create(Object.assign(Object.assign({}, req.body), { image: result.secure_url }));
                return res
                    .status(http_status_1.CREATED)
                    .json({ newArticle, message: "article created" });
                // const articles = await ArticleModel.findOne(title)
                // if(articles){
                //     return res.status(409).json({message: "article with that title already exists"})
                // }else{
                // }
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "this is the message" });
            }
        });
    }
    // async uploadImage(req: Request, res: Response){
    //     try{
    //         if (!req.file) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //           }
    //         // const { buffer } = req.file;
    //         // console.log(buffer);
    //         const { buffer, mimetype } = req.file;
    //     let dataUrl: string;
    //     if (mimetype.startsWith('image/')) {
    //         // If it's an image file, convert buffer to data URL
    //         dataUrl = `data:${mimetype};base64,${buffer.toString('base64')}`;
    //     } else {
    //         return res.status(400).json({ message: 'Unsupported file format' });
    //     }
    //         // upload file to cloudinary
    //         const result = await cloudinary.uploader.upload(dataUrl);
    //         return res.status(200).json({imageUrl: result.secure_url})
    //     }catch(error: any){
    //         console.error('Error uploading image.', error);
    //         return res.status(500).json({message: "failed to upload image"})
    //     }
    // }
    getAllArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield article_1.default.find({});
                return res
                    .status(http_status_1.OK)
                    .json({ articles, message: "All articles" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    getOneArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const Article = yield article_1.default.findById(id);
                return res.status(http_status_1.OK).json({ Article, message: `article fetched by id ${Article === null || Article === void 0 ? void 0 : Article.title}` });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message, message: "article doesnt exist" });
            }
        });
    }
    updateArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, author, image, Content } = req.body;
                const updatedArticle = yield article_1.default.findByIdAndUpdate(id, Object.assign({}, req.body));
                return res
                    .status(http_status_1.OK)
                    .json({ updatedArticle, message: "Successfully Updated" });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
    DeleteArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // check if id exists
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return res.status(403).json({ error: "Invalid article ID" });
                }
                // check if article exits
                const articleToDelete = yield article_1.default.findById(id);
                if (!articleToDelete) {
                    return res.status(403).json({ error: "article not found sorry" });
                }
                yield article_1.default.findByIdAndDelete(id);
                return res
                    .status(http_status_1.OK)
                    .json({ message: `the article was deleted of id: ${articleToDelete.id}` });
            }
            catch (error) {
                return res
                    .status(http_status_1.INTERNAL_SERVER_ERROR)
                    .json({ error: error.message });
            }
        });
    }
}
exports.articleControl = new ArticleController();

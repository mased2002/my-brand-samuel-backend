"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({ message: "welcome to your first api" });
});
// app.post("/api/articles/create", async (req: Request, res: Response) => {
//     // Your article creation logic here
//     const {title, description, author, image, Content} = req.body;
//     const newArticle = await ArticleModel.create({...req.body})
//     return res
//     .status(CREATED)
//     .json({newArticle, message: "this is my api"})
// });
app.use("/api/articles", routes_1.default.article);
app.use("/api/messages", routes_1.default.message);
app.use("/api/comments", routes_1.default.comment);
app.use("/api/projects", routes_1.default.project);
app.use("/api/users", routes_1.default.user);
exports.default = app;

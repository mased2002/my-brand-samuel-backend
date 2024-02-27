import messageRoute from "./messages";
import articleRoute from "./article";
import commentRoute from "./comments";
import projectRoute from "./project";
import userRoute from "./Users";

export default {
    article: articleRoute,
    comment: commentRoute,
    project: projectRoute,
    message: messageRoute,
    user: userRoute
}
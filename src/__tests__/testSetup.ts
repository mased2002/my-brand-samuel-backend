import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI as string;
beforeAll(async ()=> {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("connected to mongodb database")
    } catch (error: any) {
        console.error("Error connectiong to MongoDB:", error)
        throw error;
    }
})
afterAll(async ()=> {
    try {
        await mongoose.disconnect();
        await mongoose.connection.close();
        console.log("Disconnected from MOngoDB database")
    } catch (error: any) {
        console.error("error disconneting from mongodb", error);
        throw error;
    }
})
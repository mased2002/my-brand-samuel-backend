import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

beforeEach(async ()=>{
    await mongoose.connect(MONGODB_URI)
});
afterEach(async ()=>{
    await mongoose.connection.close();
});

describe("GET /", () => {
    it("should return ok status code", async ()=> {
        const res = await request(app).get("/");
        expect(res.status).toBe(200)
        expect(res.body).toEqual({message: 'welcome to your first api'})
    });
});

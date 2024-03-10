import request from 'supertest';
import { Request, Response, NextFunction, response } from 'express';
import app from '../app';
import ArticleModel from '../models/article';
import mongoose from 'mongoose';
import { describe, expect, it, test } from '@jest/globals';
import UserModel from '../models/User';
import { userControl } from '../controllers/User';
import './testSetup'
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';
import { send } from 'process';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// beforeEach(async ()=>{
//     await mongoose.connect(MONGODB_URI)
// });
// afterEach(async ()=>{
//     await mongoose.connection.close();
// });

// describe("GET /", () => {
//     it("should return ok status code", async ()=> {
//         const res = await request(app).get("/");
//         expect(res.status).toBe(200)
//         expect(res.body).toEqual({message: 'welcome to your first api'})
//     });
// });

// describe("article", ()=> {
//     describe("get all articles", () => {
//         it("should  get all articles", async () => {
//             const res = await request(app)
//             .get('/api/articles/getAll');
//             expect(res.status).toBe(200)
//             expect(res.body).toHaveProperty("message")
//             expect(res.body.message).toEqual("All articles")
//         })
//     })
// })


// mock UserController methods
// const userControlMock = {
//     loginUser: jest.fn().mockResolvedValue({token: 'mocktoken'})
// }
// jest.mock('../models/User', ()=> ({
//     UserModel: userModelMock
// }));

// describe('article CRUD Operations', () => {
//     let token : string;

//     beforeAll(async () => {
//         // mock login to obtain token
//         const loginResponse = await userControl.loginUser
//     })
// })

describe('Article Routes', () => {
    let loginToken: string;

    // setup before running tests
    beforeAll(async () => {
        // create a user
        const user = {
            name: 'TestUser',
            email: 'test@example.com',
            password: 'testPassword123',
            username: 'testUsername'
        };
        // Create user using UserController
        await userControl.createUser({ body: user}as any, {status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnValue(user)}as any)
    });
    afterAll(async () => {
        // delete all articles
        ArticleModel.deleteMany({title : "testArticle"})
    })

    describe('GET /', () => {
        it('should get welcome page', async () => {
            const welcomePage = await request(app)
            .get('/');

            expect(welcomePage.status).toBe(200);
            expect(welcomePage.body).toHaveProperty("message")
        })
    })
    describe('articles', () =>{
        beforeEach(async () => {
            const userInfo = {email:"test@example.com", password: "testPassword123" }
            const loginResponse = await request(app).post('/api/users/login').send(userInfo);
            loginToken = loginResponse.body.token
            console.log(loginToken)
        })
        describe('get articles', () => {
            it('should get all articles', async () => {
                    const getArticles = await request(app).get('/api/articles/getAll')
                     expect(getArticles.status).toBe(200)
                     expect(getArticles.body.message).toEqual("All articles")
            })
        })
        describe('create article', () => {
            it('should create an article', async () => {
                const newArticle = await request(app).post('/api/articles/create')
                .send({
                    title: "testArticle",
                    description: "test description of somekind ofcourse",
                    author: "testAuthor",
                    image: "blog image",
                    Content: "this is the test content of the article that talks about how asgard will fall from "
            })
                .set({Authorization: `Bearer ${loginToken}`})
                expect(newArticle.status).toBe(CREATED);
                expect(newArticle.body.message).toEqual("article created")
            })
            it('should fail if wrong token provided', async () => {
                const invalidToken = await request(app).post('/api/articles/create')
                .set({Authorization: "Bearer " + "adfadfawwaf"})
                expect(invalidToken.status).toBe(401)
                expect(invalidToken.body.message).toEqual("unathorized should singup")
            })
            it('should fail if field is missing', async () => {
                const fieldMissing = await request(app).post('/api/articles/create')
                .send({
                    title: "testArticle",
                    description: "test description of somekind ofcourse",
                    author: "testAuthor",
                    Content: "this is the best way to make it work, i got new curtains they a bit green, keep the old ones"
                })
                .set({Authorization: `Bearer ${loginToken}`})
                expect(fieldMissing.status).toBe(400)
                expect(fieldMissing.body).toHaveProperty("message")
            })
        })
        describe('get one article', () => {
            it('should get article by id', async () => {
                const id = "65d600c990e8315c0ec8afcd"
                const userById = (await request(app).get(`/api/articles/${id}`).set({Authorization: `Bearer ${loginToken}`}))
                expect(userById.status).toBe(OK)
                expect(userById.body).toHaveProperty("message")
            })
            it('should fail when id is wrong', async() => {
                const id = "hthis is the id"
                const userByWrongId = await request(app).get(`/api/articles/${id}`)
                .set({Authorization: `Bearer ${loginToken}`})
                expect(userByWrongId.status).toBe(INTERNAL_SERVER_ERROR)
                expect(userByWrongId.body.message).toEqual("article doesnt exist")
            })
            it('should fail if wrong token provided', async () => {
                const id = "65d600c990e8315c0ec8afcd"
                const invalidToken = await request(app).get(`/api/articles/${id}`)
                .set({Authorization: `Bearer sarraare`})
                expect(invalidToken.status).toBe(401)
                expect(invalidToken.body.message).toEqual("unathorized should singup")
            })
        })
        describe("update article", () => {
            it("should get one article and update it", async () => {
                const id = "65d600c990e8315c0ec8afcd"
                const updatedArticle = await request(app).patch(`/api/articles/${id}`).send({
                    title: "updated article please be the one",
                    description: "updated article description",
                    author: "bella",
                    image: "samuel.jpg",
                    Content: "update article content on how it must work simillar interst"
                }).set({Authorization: `Bearer ${loginToken}`})
                expect(updatedArticle.status).toBe(200)
                expect(updatedArticle.body).toHaveProperty("message", "Successfully Updated")
            })
            it("should fail if there is a field missing", async () => {
                const id = "65d600c990e8315c0ec8afcd"
                const updatedArticleFailed = await request(app).patch(`/api/articles/${id}`).send({
                    title: "updated article",
                    description: "updated article description",
                    Content: "update article content on how it must work simillar interst"
                })
                .set({Authorization: `Bearer ${loginToken}`})
                expect(updatedArticleFailed.status).toBe(400)
                expect(updatedArticleFailed.body).toHaveProperty("message")
            })
        })
        describe("delete article", () => {
            it("should delete article with the id", async () => {
                const id = "65e89d2b5d2942eb74b92e10"
                const deleteArticle = await request(app).delete(`/api/articles/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(deleteArticle.status).toBe(200)
                expect(deleteArticle.body).toHaveProperty("message")
            })
            it("should fail if id is wrong", async () => {
                const id = "redweerrer"
                const wrongId = await request(app).delete(`/api/articles/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(wrongId.status).toBe(403)
                expect(wrongId.body).toHaveProperty("error")
                console.log(wrongId.body.error)
            })
        })

    })
})
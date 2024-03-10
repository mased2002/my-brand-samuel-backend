import { describe, test, it, expect } from '@jest/globals'
import app from '../app'
import MessageModel from '../models/messages'
import request from 'supertest'


// delte all test messages
afterAll(async () => {
    try {
        // Attempt to delete documents with the name "test name"
        await MessageModel.deleteMany({ name: "test name" });
    } catch (error) {
        // Log the error and handle it appropriately
        console.error("Error occurred while deleting documents:", error);
        // You can choose to rethrow the error or handle it in another way,
        // such as retrying the deletion or performing alternative cleanup steps.
        throw error;
    }
})

import './testSetup'
describe("message route", () => {
    let loginToken : string;

    describe("messages", () => {
        beforeEach(async () => {
            const userInfo = {email: "test@example.com", password: "testPassword123"}
            const loginResponse = await request(app).post(`/api/users/login`).send(userInfo)
            loginToken = loginResponse.body.token
            console.log(loginToken)
        })
        describe("create message", () => {
            it("should create a message", async() => {
                const message = await request(app).post("/api/messages/create").send({
                    name: "test name",
                    email: "testmessage@gmail.com",
                    content: "this is the test content"
                }).set({Authorization: `Bearer ${loginToken}`})
                expect(message.status).toBe(201)
                expect(message.body.message).toEqual("message created")
            })
           it("should fail if it is missing required field", async () => {
            const messageMissingField = await request(app).post("/api/messages/create").send({
                content: "this is the test content",
                name: "test name"
            }).set({Authorization: `Bearer ${loginToken}`})
            expect(messageMissingField.status).toBe(400)
            expect(messageMissingField.body).toHaveProperty("message")
           })
           it("should fail if logintoken is wrong or missing", async () => {
            const invalidToken = await request(app).post(`/api/messages/create`).send({
                name: "test name",
                email: "testmessage@gmail.com",
                content: "this is the test content"
            }).set({Authorization: `Bearer ludaverse`})
            expect(invalidToken.status).toBe(401)
            expect(invalidToken.body.message).toEqual("unathorized should singup")
           })
        })
    })
    describe("get all messages", () => {
        it("should return all messages", async() => {
            const allmessages = await request(app).get("/api/messages/getAll").set({Authorization: `Bearer ${loginToken}`})
            expect(allmessages.status).toBe(200)
            expect(allmessages.body.message).toEqual("these are all the messages")
        })
    })
    describe("get one message", () => {
        it("should return one message", async () => {
            const id = "65eb55fc18215830dab46a6b"
            const onemessage = await request(app).get(`/api/messages/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(onemessage.status).toBe(200)
            expect(onemessage.body.message).toEqual("the message that was caught")
        })
        it("should fail if id is wrong", async () => {
            const id = "4543245"
            const oneproject = await request(app).get(`/api/messages/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(oneproject.status).toBe(404)
        }) 
    })
    describe("delete message", () => {
        it("should delete message with the id", async() => {
            const id = "65d72b5089128ea53a40befe"
            const deleteProject = await request(app).delete(`/api/messages/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(deleteProject.status).toBe(200)
            expect(deleteProject.body.message).toEqual(`message to delete is this${id}`)
        })
    })
})
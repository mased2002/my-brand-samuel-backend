import { describe, test, it, expect } from '@jest/globals'
import app from '../app'
import CommentModel from '../models/comments'
import request from 'supertest'
import './testSetup'
import { OK } from 'http-status'

describe("comment route", () => {
    let loginToken : string;

    describe("comments", () => {
        beforeEach(async () => {
            const userInfo = {email: "test@example.com", password: "testPassword123"}
            const loginResponse = await request(app).post(`/api/users/login`).send(userInfo)
            loginToken = loginResponse.body.token
            console.log(loginToken)
        })
        describe("create comment", () => {
            it("should create a comment", async() => {
                const comment = await request(app).post("/api/comments/create").send({
                    name: "test name",
                    content: "this is the test content of a comment",
                    onBlog: "what is programming"
                }).set({Authorization: `Bearer ${loginToken}`})
                expect(comment.status).toBe(201)
                expect(comment.body.message).toEqual("comment created")
            })
            it("should fail if missing required field", async () => {
                const missingField = await request(app).post("/api/comments/create").send({
                    name: "test name",
                    onBlog: "what is programming"
                }).set({Autorization: `Bearer ${loginToken}`})
                expect(missingField.status).toBe(400)
                expect(missingField.body.message).toEqual("missing field in comment")
            })
        })
        describe("approve comment", () => {
            it("should approve the comment",  async () => {
                const id = "65ee027bc49a8848ecaf67bc"
                const approvedComment = await request(app).patch(`/api/comments/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(approvedComment.status).toBe(200)
                expect(approvedComment.body.message).toEqual("comment apporved") 
            })
            it("should fail if comment doesn't exist", async () => {
                const id = "qweq"
                const wrongId = await request(app).patch(`/api/comments/${id}`).set({Authorizaion: `Bearer ${loginToken}`})
                expect(wrongId.status).toBe(500)
                expect(wrongId.body.message).toEqual("comment doesn't exist")
            })
        })
        describe("get all comments", () => {
            it("should get all comments", async () => {
                const allComments = await request(app).get(`/api/comments/getAll`).set({Authorization: `Bearer ${loginToken}`})
                expect(allComments.status).toBe(OK)
                expect(allComments.body.message).toEqual("these are all the comments")
            })
        })
        describe("delete comment", () => {
            it.skip("should delete comment", async () => {
                const id = "65ee07b20cdc0b12c648e378"
                const deleteComment = await request(app).delete(`/api/comments/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(deleteComment.status).toBe(OK)
                expect(deleteComment.body.message).toEqual("comment successfuly deleted")
            })
        })

    })
})
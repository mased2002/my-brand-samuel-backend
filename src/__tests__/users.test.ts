import request from 'supertest'
import './testSetup'
import { describe, test, it, expect } from '@jest/globals'
import app from '../app'
import UserModel from '../models/User'
import { NOT_FOUND, OK } from 'http-status'
const userInfo = {
    name: "test user samuel",
    email: "really@gmail.com",
    password: "faith123!Q"
}
describe("user routes", () => {
    let loginToken : string;
    describe("signup route", () => {
        it("should create the user when you signup", async() => {
            const user = await request(app).post('/api/users/signup').send(userInfo)
            expect(user.status).toBe(201)
            expect(user.body.message).toEqual("user created successfuly")
        })
        it("should fail if email is not unique", async() => {
            const emailNotUnique = await request(app).post('/api/users/signup').send({
                name: "samuel",
                email: "shelby@peakyblinders.com",
                password: "banana password"
            })
            expect(emailNotUnique.status).toBe(404)
            expect(emailNotUnique.body).toHaveProperty("message", "seems user already exist")
        })
        it("should fail if missing field", async() => {
            const emailMissingField = await request(app).post("/api/users/signup").send({
                name: "samueled",
                email: "banana@gmail.com"
            })
            expect(emailMissingField.status).toBe(400)
        })
    })
    describe("login page", () => {
        it("should signin successfuly a user", async ()=> {
            const user = await request(app).post('/api/users/login').send({
                email: 'test@example.com',
                password: 'testPassword123'
            })
            loginToken = user.body.token
            expect(user.status).toBe(OK)
            expect(user.body.message).toEqual("password is a match and you are LoggedIn")
        })
        it("should fail if email doesn't match any", async () => {
            const user = await request(app).post('/api/users/login').send({
                email: 'takemoney2pac@gmail.com',
                password: 'testPassword123'
            })
            expect(user.status).toBe(404)
            expect(user.body.message).toEqual("User not Found")
        })
        it("should fail if password is a mismatch", async() => {
            const user = await request(app).post('/api/users/login').send({
                email: 'test@example.com',
                password: 'testPasswo'
            })
            expect(user.status).toBe(404)
            expect(user.body.message).toEqual("password doesn't match")
        })
    })
    describe("get users", () => {
        it("should get all users", async () => {
           const getAllUsers = await request(app).get(`/api/users/getAll`).set({Authorization: `Bearer ${loginToken}`})
            expect(getAllUsers.status).toBe(200)
            expect(getAllUsers.body.message).toEqual("these are all the users")
        })
    })
    describe("delete user", () => {
        it("should delete id user", async () => {
            const id = "65df07c9e724c5a062de9467"
            const deleteUser = await request(app).delete(`/api/users/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(deleteUser.status).toBe(200)
            expect(deleteUser.body.message).toEqual("user deleted successfully")
        })
        it("should fail if email is wrong", async () => {
            const email = "wrong email"
            const wrongId = await request(app).delete(`/api/users/${email}`).set({Authorization: `Bearer ${loginToken}`})
            expect(wrongId.status).toBe(NOT_FOUND)
            expect(wrongId.body.message).toEqual("User Not found")
        })
    })
})
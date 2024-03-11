import request from 'supertest'
import './testSetup'
import { describe, test, it, expect } from '@jest/globals'
import app from '../app'
import UserModel from '../models/User'
import { NOT_FOUND, OK } from 'http-status'
const userInfo = {
    name: "test user",
    email: "klaus@gmail.com",
    password: "faith123!Q"
}
describe("user routes", () => {
    let loginToken : string;
    let adminToken : string;
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
        it("should signin successfuly an admin", async () => {
            const adminUser = await request(app).post(`/api/users/login`).send({
                email : "polly@peakyblinders.com",
                password : "peakyFooking123!"
            })
            adminToken = adminUser.body.token
            expect(adminUser.status).toBe(OK)
            expect(adminUser.body.message).toEqual("password is a match and you are LoggedIn")
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
    describe("get one user", () => {
        it("should get one user", async ()=> {
            const id = "65edd23c50ad2e066d821bda"
            const getOneUser = await request(app).get(`/api/users/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(getOneUser.status).toBe(200)
            expect(getOneUser.body.message).toEqual("user found")
        })
    })
    describe("update one user", () => {
        it("should update all users", async () => {
            const id = "65ee0fadb53ed56cc1bbc309"
            const updateUser = await request(app).patch(`/api/users/${id}`).set({Authorization: `Bearer ${adminToken}`})
            expect(updateUser.status).toBe(200)
            expect(updateUser.body.message).toEqual("user updated to admin")
        })
        it("should fail if the user is not admin", async () => {
            const id = "65ee0fadb53ed56cc1bbc309"
            const updateUser = await request(app).patch(`/api/users/${id}`).set({Authorization: `Bearer ${loginToken}`})
            expect(updateUser.status).toBe(403)
        })
    })
    describe("delete user", () => {
        it("should delete email user", async () => {
            const email = "human@big.green"
            const deleteUser = await request(app).delete(`/api/users/${email}`).set({Authorization: `Bearer ${loginToken}`})
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
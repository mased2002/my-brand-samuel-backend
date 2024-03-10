import request from 'supertest'
import './testSetup'
import ProjectModel from '../models/projects'
import app from '../app'
import { describe, test, it, expect } from '@jest/globals'
// afterAll({

// })
afterAll(async () => {
   await ProjectModel.deleteMany({projectTitle: "test project"})
})

describe("project routes", () => {
    let loginToken : string;

    describe("projects", () => {
        beforeEach(async () => {
            const userInfo = {email: "test@example.com", password: "testPassword123"}
            const loginResponse = await request(app).post(`/api/users/login`).send(userInfo)
            loginToken = loginResponse.body.token
            console.log(loginToken)
        })
        describe("create project", () => {
            it.skip("should create a project", async() => {
                const project = await request(app).post("/api/projects/create").send({
                    projectTitle: "test project",
                    projectImg: "project.img",
                    projectDescription: "this is the test descirption",
                    projectTechs: [
                        "Typescript",
                        "Html",
                        "nodejs"
                    ],
                    projectLink: "link to live project",
                    projectCodeLink: "link to my project source code on github"
                }).set({Authorization: `Bearer ${loginToken}`})
                expect(project.status).toBe(201)
                expect(project.body.message).toEqual("this is the message")
            })
           it("should fail if it is missing required field", async () => {
            const projetMissingField = await request(app).post("/api/projects/create").send({
                projectImg: "project.img",
                projectDescription: "this is the test description"
            }).set({Authorization: `Bearer ${loginToken}`})
            expect(projetMissingField.status).toBe(400)
            expect(projetMissingField.body).toHaveProperty("message")
           })
           it("should fail if logintoken is wrong or missing", async () => {
            const invalidToken = await request(app).post(`/api/projects/create`).send({
                    projectTitle: "test project",
                    projectImg: "project.img",
                    projectDescription: "this is the test descirption",
                    projectTechs: [
                        "Typescript",
                        "Html",
                        "nodejs"
                    ],
                    projectLink: "link to live project",
                    projectCodeLink: "link to my project source code on github"
            }).set({Authorization: `Bearer ludaverse`})
            expect(invalidToken.status).toBe(401)
            expect(invalidToken.body.message).toEqual("unathorized should singup")
           })
        })
        describe("get all projects", () => {
            it("should return all projects", async() => {
                const allProjects = await request(app).get("/api/projects/getAll").set({Authorization: `Bearer ${loginToken}`})
                expect(allProjects.status).toBe(200)
                expect(allProjects.body.message).toEqual("this all the projects")
            })
        })
        describe("get one project", () => {
            it("should return one project", async () => {
                const id = "65d89e0e9e3adf0e5e3af62a"
                const oneProject = await request(app).get(`/api/projects/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(oneProject.status).toBe(200)
                expect(oneProject.body.message).toEqual("this is the project selected")
            })
            it("should fail if id is wrong", async () => {
                const id = "4543245"
                const oneproject = await request(app).get(`/api/projects/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(oneproject.status).toBe(500)
            }) 
        })
        describe("update project", () => {
            it("should update a project on that id", async () =>{
                const id = "65d89e0e9e3adf0e5e3af62a"
                const updateProject = await request(app).patch(`/api/projects/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(updateProject.status).toBe(200)
                expect(updateProject.body).toHaveProperty("project")
            })
        })
        describe("delete project", () => {
            it("should delete project with the id", async() => {
                const id = "65eb41bb8241c823dedea39e"
                const deleteProject = await request(app).delete(`/api/projects/${id}`).set({Authorization: `Bearer ${loginToken}`})
                expect(deleteProject.status).toBe(200)
                expect(deleteProject.body.message).toEqual("article deleted successfully")
            })
        })
    })
})
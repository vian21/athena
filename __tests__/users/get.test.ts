import { describe, expect, test } from "vitest";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import app from "../../src/app";

import { getUsers, getUser } from "@api/users/get";

const request = require("supertest");

describe("Testing GET users", async () => {
    await app.ready(); //instatiate server with all the plugins loaded

    test("GET all users", async () => {
        const users = await getUsers(db, logger);
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
    });

    test("Testing endpoint GET users", async () => {
        const response = await request(app.server).get("/api/users")
            .expect(200)
            .expect("Content-Type", /json/);

    })

    test("GET one user", async () => {
        const user = await getUser(31, db, logger);
        expect(user).toBeTypeOf("object");
        expect(user.id).toBeDefined();
    });

    // test("Entering wrong id", async () => {

    //     expect(await getUser("h", db, logger)).toBeTypeOf("object");
    // });

    //insert user
    /*
    * 1. insert user(objectr)
    const user ={
        "name": "test",
        "email: "kjs@gmai.com"
    }
    db.users.create({data: user})

    2. get the user by name and email
    const userSlected = await db.users.findUnique({name: user.name, email: user.email})
    expect(userSelected).toBedefined())
    expect(userSelected.name).toBe(user.name)
    expect(userSelected.email).toBe(user.email)
    expect(userSelected).tobetypeof("object")
    */
});

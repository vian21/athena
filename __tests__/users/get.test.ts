import { describe, expect, test } from "vitest";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import app from "../../src/app";

import { getUsers } from "@api/users/get";

const request = require("supertest");

describe("Testing GET users", async () => {
    await app.ready(); //instatiate server with all the plugins loaded

    test("GET all users", async () => {
        const users = await getUsers(db, logger);
        expect(Array.isArray(users)).toBe(true);
    });

    test("Testing endpoint GET users", async () => {
        const response = await request(app.server).get("/api/users").expect(200).expect("Content-Type", /json/);
    })
});

import { describe, expect, test } from "vitest";

import { schoolSchema, schoolSelect } from "@api/plugins/interfaces";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import app from "../../src/app";

import { getSchools, getSchool } from "@api/schools/get";

const request = require("supertest");

describe("Testing GET schools", async () => {
    const schoolId = 1;

    await app.ready(); //instatiate server with all the plugins loaded

    test("GET all schools", async () => {
        const schools = await getSchools(db, logger);
        expect(Array.isArray(schools)).toBe(true);
    });

    test("Testing endpoint GET schools", async () => {
        const response = await request(app.server)
            .get("/api/schools")
            .expect(200)
            .expect("Content-Type", /json/);
    });

    test("Testing endpoint GET school", async () => {
        const reponse = await request(app.server)
            .get(`/api/schools/${schoolId}`)
            .expect(200)
            .expect("content-Type", /json/);
    });

    test("Get one school", async () => {
        const school = await getSchool(schoolId, db, logger);

        expect(school).toBeTypeOf("object");

        expect(schoolSchema.required().safeParse(school).success).toBe(true);
    });
});

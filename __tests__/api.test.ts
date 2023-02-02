import supertest from "supertest";
import { describe, expect, test } from "vitest";

import app from "../src/app";

describe("testing the api", () => {
    app.ready()
    test("testing /api", () => {
        supertest("http://localhost:3000")
            .get("/api")
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body).toEqual("welcome to the api")
            })
    })
})
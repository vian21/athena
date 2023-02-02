import supertest from "supertest";
import { describe, expect, test } from "vitest";

import app from "../src/app";

describe("testing the api", () => {
    app.ready();

    test("testing /api", async () => {
        const response = await request(app.server).get("/api").expect(200);
    });
});

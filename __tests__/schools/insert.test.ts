import { describe, expect, test } from "vitest";

import { schoolSchema } from "@api/plugins/interfaces";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import app from "../../src/app";

import newSchool from "@api/schools/insert";

describe("Testing POST schools", async () => {
    await app.ready(); //instatiate server with all the plugins loaded

    test("Testing if a new school is added", (async) => {
        const newschool = newSchool(db, logger);
        // expect(newschool).to.be.true;
    });
});

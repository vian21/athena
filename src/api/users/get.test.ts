import { describe, expect, test, jest } from "@jest/globals";

import db from "../../../src/api/plugins/db";
import logger from "../../../src/api/plugins/logger";

import { getUsers } from "./get";

describe("Testing GET users", () => {
    test("GET all users", async () => {
        const users = await getUsers(db, logger);
        console.log(users);
        expect(Array.isArray(users)).toBe(true);
    });
});

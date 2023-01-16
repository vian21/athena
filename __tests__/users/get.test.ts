import { describe, expect, test } from "vitest";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getUsers } from "@api/users/get";

describe("Testing GET users", () => {
    test("GET all users", async () => {
        const users = await getUsers(db, logger);
        expect(Array.isArray(users)).toBe(true);
    });
});

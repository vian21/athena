import { describe, expect, test } from '@jest/globals';

import { getUsers, getUser } from '@api/users/get';
import db from '@api/plugins/db';
import logger from '@api/plugins/logger';

describe("Testing GET users", () => {
    test("GET all users", async () => {
        const users = await getUsers(db, logger);
        console.log(users)
        // expect(Array.isArray(users)).toBe(true);
    })
})
import { getUsers, getUser } from "./get";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { FastifyInstance } from "fastify";
import newUser from "./insert";
import deleteUser from "./deleteUser";
import updateUser from "./update";

interface User {
    id: number;
}

export default function users(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getUsers(db, logger);
    });

    server.get<{ Params: User }>("/:id", async (req) => {
        const userId = Number(req.params.id);

        if (isNaN(userId)) return {}


        return await getUser(userId, db, logger);
    });

    server.delete("/:id", async (req) => {
        const userId = Number(req.params.id);
        if (isNaN(userId)) return {}

        return await deleteUser(userId, db, logger);
    })

    server.patch("/:id", async (req) => {

        const userId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(userId)) return {}

        return await updateUser(userId, newData, db, logger);

    });

    server.post("/", async (req) => {

        const newData = req.body;

        return await newUser(newData, db, logger);

    });

    done();
}


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
    server.get("/", async (_req, res) => {

        return await getUsers(db, logger);
    });

    server.get<{ Params: User }>("/:id", async (req, res) => {
        const userId = Number(req.params.id);

        return await getUser(userId, db, logger);
    });

    server.delete("/:id", async () => {
        const userId = Number(req.params.id);

        return await deleteUser(userId, db, logger);
    })

    server.patch("/:id", async (req) => {
        //get the params
        const userId = Number(req.params.id);
        const newData = req.body;

        return await updateUser(userId, newData, db, logger);

    });

    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newUser(newData, db, logger);

    });

    done();
}


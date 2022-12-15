import getUsers from "./getUsers";
import getUser from "./getUser";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { FastifyInstance } from "fastify";

interface User {
    id: number;
}
export default function users(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        res.send(await getUsers(db, logger));
    });

    server.get<{ Params: User }>("/:id", async (req, res) => {
        const userId = Number(req.params.id);

        res.send(await getUser(userId, db, logger));
    });

    done();
}

export { getUsers };

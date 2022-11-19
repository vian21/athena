import getUsers from "./getUsers";
import getUser from "./getUser";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default function users(
    server: FastifyInstance,
    opts: object,
    done: any
) {
    server.get("/", async (req: FastifyRequest, res: FastifyReply) => {
        res.send(await getUsers(db, logger));
    });

    server.get("/:id", async (req: FastifyRequest, res: FastifyReply) => {
        const userId = Number(req.params.id);

        res.send(await getUser(userId, db, logger));
    });

    done();
}

export { getUsers };

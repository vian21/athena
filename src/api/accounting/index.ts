import { getAccountings, getAccounting } from "./get";
import updateAccounting from "./update";
import deleteAccounting from "./delete";
import newAccounting from "./insert";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { FastifyInstance } from "fastify";

interface accountingId {
    id: number;
}

export default function accounting(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getAccountings(db, logger)
    });

    server.get<{ Params: accountingId }>("/:id", async (req) => {
        const accountingId = Number(req.params.id);
        if (isNaN(accountingId)) return {}

        return await getAccounting(accountingId, db, logger);
    });

    server.patch("/:id", async (req) => {

        const accountingId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(accountingId)) return {}

        return await updateAccounting(accountingId, newData, db, logger);
    });

    server.delete("/:id", async (req) => {
        const accountingId = Number(req.params.id);
        if (isNaN(accountingId)) return {}

        return await deleteAccounting(accountingId, db, logger);
    })
    server.post("/", async (req) => {

        const newData = req.body;

        return await newAccounting(newData, db, logger);

    });

    done();
}
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
    server.get("/", async (_req, res) => {

        return await getAccountings(db, logger)
    });

    server.get<{ Params: accountingId }>("/:id", async (req, res) => {
        const accountingId = Number(req.params.id);

        res.send(await getAccounting(accountingId, db, logger));
    });

    server.patch("/:id", async (req) => {
        //get the params
        const accountingId = Number(req.params.id);
        const newData = req.body;

        return await updateAccounting(accountingId, newData, db, logger);
    });

    server.delete("/:id", async (req, res) => {
        const accountingId = Number(req.params.id);

        res.send(await deleteAccounting(accountingId, db, logger));
    })
    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newAccounting(newData, db, logger);

    });

    done();
}
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getSchoolTransactions, getSchoolTransaction } from "./get";
import { updateSchoolTransaction } from "./update";

import { FastifyInstance } from "fastify";
import deleteSchoolTransactions from "./delete";
import newschoolTransaction from "./insert";

interface school_id {
    id: number;
}

export default function schoolTransactions(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        res.send(await getSchoolTransactions(db, logger));
    });

    server.get<{ Params: school_id }>("/:id", async (req, res) => {
        const school_id = Number(req.params.id);

        res.send(await getSchoolTransaction(school_id, db, logger));
    });

    server.delete("/:id", async (req, res) => {
        const school_id = Number(req.params.id);

        return await deleteSchoolTransactions(school_id, db, logger);
    })

    server.patch("/:id", async (req) => {
        //get the params
        const transactionId = Number(req.params.id);
        const newData = req.body;

        return await updateSchoolTransaction(transactionId, newData, db, logger);

    });

    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newschoolTransaction(newData, db, logger);

    });

    done();
}
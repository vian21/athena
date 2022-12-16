import { getDisciplineRecord, getDisciplineRecords } from "./get";
import updateDiscipline from "./update";
import deleteDiscipline from "./delete";
import newDiscipline from "@api/accounting/insert";
import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { FastifyInstance } from "fastify";

interface disciplineId {
    id: number;
}

export default function discipline(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async (_req, res) => {

        return await getDisciplineRecords(db, logger)
    });

    server.get<{ Params: disciplineId }>("/:id", async (req, res) => {
        const disciplineId = Number(req.params.id);

        res.send(await getDisciplineRecord(disciplineId, db, logger));
    });

    server.patch("/:id", async (req, res) => {
        //get the params
        const disciplineId = Number(req.params.id);
        const newData = req.body;

        return await updateDiscipline(disciplineId, newData, db, logger);
    });

    server.delete("/:id", async (req, res) => {
        const disciplineId = Number(req.params.id);

        res.send(await deleteDiscipline(disciplineId, db, logger));
    })

    server.post("/", async (req, res) => {
        //get the params
        const newData = req.body;

        return await newDiscipline(newData, db, logger);

    });

    done();
}
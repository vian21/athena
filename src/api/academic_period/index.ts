import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getAcademicPeriods, getAcademicPeriod } from "./get";
import { updateAcademicPeriod } from "./update";

import deleteAcademicPeriod from "./delete";

import newAcademicPeriod from "./insert";

import { FastifyInstance } from "fastify";

interface AcademicsId {
    id: number;
}

export default function academicPeriods(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getAcademicPeriods(db, logger);
    });

    server.get<{ Params: AcademicsId }>("/:id", async (req) => {
        const periodId = Number(req.params.id);
        if (isNaN(periodId)) return {}

        return await getAcademicPeriod(periodId, db, logger);
    });

    server.delete("/:id", async (req) => {
        const periodId = Number(req.params.id);

        if (isNaN(periodId)) return {}

        return await deleteAcademicPeriod(periodId, db, logger);
    })

    server.patch("/:id", async (req) => {

        const PeriodId = Number(req.params.id);
        const newData = req.body;

        if (isNaN(PeriodId)) return {}

        return await updateAcademicPeriod(PeriodId, newData, db, logger);

    });

    server.post("/", async (req, res) => {
        const newData = req.body;

        return await newAcademicPeriod(newData, db, logger)
    })



    done();
}
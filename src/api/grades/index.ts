import { FastifyInstance } from "fastify";

import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getGrades, getGrade } from "./get";
import { updateGrades } from "./update";

import newGrade from "./insert";
import deleteGrades from "./delete";

interface grade_id {
    id: number;
}

interface Grade {
    school_id?: number;
    academic_period_id?: number;
}

export default function Grades(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getGrades(db, logger);
    });

    server.get<{ Params: grade_id }>("/:id", async (req) => {
        const gradeId = Number(req.params.id);

        return await getGrade(gradeId, db, logger);
    });

    server.delete("/:id", async (req) => {

        const gradeId = Number(req.params.id);
        if (isNaN(gradeId)) return {}

        return await deleteGrades(gradeId, db, logger);
    })

    server.patch<{ Body: Grade }>("/:id", async (req) => {

        const gradeId = Number(req.params.id);
        const newData = req.body;

        if (isNaN(gradeId) || newData instanceof Grade) return {}

        return await updateGrades(gradeId, newData, db, logger);

    });

    server.post("/", async (req) => {

        const newData = req.body;

        return await newGrade(newData, db, logger);

    });

    done();
}


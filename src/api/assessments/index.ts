import db from "@api/plugins/db";
import logger from "@api/plugins/logger";

import { getAssessments, getAssessment } from "./get";
import { updateAssessment } from "./update";
import insertAssessment from "./insert";
import deleteAssessment from "./delete";

import { FastifyInstance } from "fastify";

interface AssessmentId {
    id: number;
}

export default function assessments(
    server: FastifyInstance,
    _opts: object,
    done: any
) {
    server.get("/", async () => {

        return await getAssessments(db, logger);
    });

    server.get<{ Params: AssessmentId }>("/:id", async (req) => {
        const assessmentId = Number(req.params.id);
        if (isNaN(assessmentId)) return {}

        return await getAssessment(assessmentId, db, logger);
    });

    server.patch("/:id", async (req) => {

        const assessmentId = Number(req.params.id);
        const newData = req.body;
        if (isNaN(assessmentId)) return {}

        return await updateAssessment(assessmentId, newData, db, logger);

    });

    server.post("/", async (req) => {

        const newData = req.body;

        return await insertAssessment(newData, db, logger)
    })

    server.delete("/:id", async (req) => {
        const assessmentId = Number(req.params.id)
        if (isNaN(assessmentId)) return {}

        return await deleteAssessment(assessmentId, db, logger)
    })

    done();
}


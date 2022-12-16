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
    server.get("/", async (_req, res) => {

        return await getAssessments(db, logger);
    });

    server.get<{ Params: AssessmentId }>("/:id", async (req, res) => {
        const assessmentId = Number(req.params.id);

        return await getAssessment(assessmentId, db, logger);
    });

    server.patch("/:id", async (req, res) => {
        //get the params
        const assessmentId = Number(req.params.id);
        const newData = req.body;

        return await updateAssessment(assessmentId, newData, db, logger);

    });

    server.post("/", async (req, res) => {
        //get params
        const newData = req.body;

        return await insertAssessment(newData, db, logger)
    })

    server.delete("/:id", async (req, res) => {
        // get params
        const assessmentId = Number(req.params.id)

        return await deleteAssessment(assessmentId, db, logger)
    })

    done();
}

